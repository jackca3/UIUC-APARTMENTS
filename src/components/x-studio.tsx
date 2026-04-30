"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Loader2,
  PlugZap,
  Send,
  ShieldCheck,
  Unplug,
  XCircle,
} from "lucide-react";

type SessionStatus = {
  authenticated: boolean;
  email: string | null;
};

type AccountStatus = {
  authenticated: boolean;
  email?: string;
  configReady: boolean;
  missingConfig: string[];
  account: {
    xUsername: string;
    xName: string | null;
    xUserId: string;
    profileImageUrl: string | null;
    scopes: string[];
    connectedAt: string;
  } | null;
};

type Draft = {
  id: string;
  text: string;
  status: "draft" | "published" | "failed";
  scheduled_for: string | null;
  published_post_id: string | null;
  last_error?: string | null;
  created_at: string;
  updated_at: string;
};

const MAX_POST_LENGTH = 280;

function buildTweetIntentUrl(text: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function XStudio() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<SessionStatus | null>(null);
  const [account, setAccount] = useState<AccountStatus | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingCode, setRequestingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishingDraftId, setPublishingDraftId] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);

  const [email, setEmail] = useState(user?.email ?? "");
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [text, setText] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const remainingCharacters = MAX_POST_LENGTH - text.length;
  const isTextInvalid = remainingCharacters < 0 || !text.trim();

  const callbackNotice = useMemo(() => {
    if (searchParams.get("xConnected")) return "Your X account is now connected.";

    const xError = searchParams.get("xError");
    if (!xError) return null;

    switch (xError) {
      case "auth":
        return "Verify your secure draft session before connecting an account.";
      case "config":
        return "Direct publishing is not configured yet, but you can still save drafts here.";
      case "state":
        return "The X OAuth session expired or could not be verified. Try connecting again.";
      case "exchange":
        return "X account connection failed during token exchange.";
      default:
        return `X returned an error: ${xError}`;
    }
  }, [searchParams]);

  async function refreshStudio() {
    setLoading(true);
    setError(null);

    try {
      const [sessionRes, accountRes] = await Promise.all([
        fetch("/api/x/session", { cache: "no-store" }),
        fetch("/api/x/account", { cache: "no-store" }),
      ]);

      const sessionData = (await sessionRes.json()) as SessionStatus;
      const accountData = (await accountRes.json()) as AccountStatus;

      setSession(sessionData);
      setAccount(accountData);

      if (sessionData.authenticated) {
        const draftsRes = await fetch("/api/x/drafts", { cache: "no-store" });
        const draftsData = await draftsRes.json();
        if (draftsRes.ok) {
          setDrafts(draftsData.drafts ?? []);
        } else {
          setDrafts([]);
          setError(draftsData.error || "Failed to load drafts.");
        }
      } else {
        setDrafts([]);
      }
    } catch {
      setError("Failed to load the draft studio state.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.email) {
      setEmail((current) => current || user.email);
    }
  }, [user?.email]);

  useEffect(() => {
    refreshStudio();
  }, []);

  useEffect(() => {
    if (callbackNotice) {
      setNotice(callbackNotice);
    }
  }, [callbackNotice]);

  async function handleRequestCode() {
    setRequestingCode(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/x/session/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to send code.");
        return;
      }

      setVerificationToken(data.verificationToken);
      setNotice(
        data.dev
          ? "Verification code sent. SMTP is not configured, so check the local server console for the code."
          : "Verification code sent. Check your inbox."
      );
    } catch {
      setError("Network error while requesting a verification code.");
    } finally {
      setRequestingCode(false);
    }
  }

  async function handleVerifyCode() {
    if (!verificationToken) {
      setError("Request a verification code first.");
      return;
    }

    setVerifyingCode(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/x/session/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: verificationCode,
          verificationToken,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Verification failed.");
        return;
      }

      setVerificationCode("");
      setVerificationToken(null);
      setNotice("Secure draft session verified.");
      await refreshStudio();
    } catch {
      setError("Network error while verifying your code.");
    } finally {
      setVerifyingCode(false);
    }
  }

  async function handleDisconnect() {
    setDisconnecting(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/x/account", { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to disconnect X account.");
        return;
      }

      setNotice("Your X account was disconnected.");
      await refreshStudio();
    } catch {
      setError("Network error while disconnecting X.");
    } finally {
      setDisconnecting(false);
    }
  }

  async function handleClearSecureSession() {
    await fetch("/api/x/session", { method: "DELETE" });
    setVerificationToken(null);
    setVerificationCode("");
    setNotice("Secure draft session cleared.");
    await refreshStudio();
  }

  async function handleSaveDraft() {
    setSavingDraft(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/x/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          scheduledFor: scheduledFor || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to save draft.");
        return;
      }

      setText("");
      setScheduledFor("");
      setDrafts((current) => [data.draft, ...current]);
      setNotice("Draft saved inside Apt.ly.");
    } catch {
      setError("Network error while saving draft.");
    } finally {
      setSavingDraft(false);
    }
  }

  async function handlePublishDraft(draftId: string) {
    setPublishingDraftId(draftId);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch(`/api/x/drafts/${draftId}/publish`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to publish draft.");
        await refreshStudio();
        return;
      }

      setDrafts((current) =>
        current.map((draft) => (draft.id === draftId ? data.draft : draft))
      );
      setNotice(`Draft published to X. Post ID: ${data.xPostId}`);
    } catch {
      setError("Network error while publishing draft.");
    } finally {
      setPublishingDraftId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-[36px] border border-gray-100 bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-uiuc-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[36px] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-uiuc-orange/10 text-uiuc-orange">
                <PlugZap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                  X Draft Studio
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-uiuc-navy">
                  Save drafts before you post
                </h3>
              </div>
            </div>
            <p className="max-w-2xl text-sm font-medium leading-7 text-gray-500">
              Save your post ideas inside Apt.ly first. If you connect X later, you can publish in
              one click. If not, you can still open a draft in X and post it manually.
            </p>
          </div>

          {session?.authenticated ? (
            <Button
              variant="outline"
              onClick={handleClearSecureSession}
              className="rounded-full px-6 font-black uppercase tracking-widest"
            >
              End secure session
            </Button>
          ) : null}
        </div>

        {notice ? (
          <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
            {notice}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        ) : null}

        {!session?.authenticated ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] bg-gray-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                Step 1
              </p>
              <h4 className="mt-2 text-xl font-black uppercase tracking-tighter text-uiuc-navy">
                Verify your secure session
              </h4>
              <p className="mt-3 text-sm font-medium leading-7 text-gray-500">
                Drafts are saved on the server, so this uses a separate secure session instead of
                the app's client-only login state.
              </p>
              <div className="mt-5 space-y-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="yournetid@illinois.edu"
                  className="h-12 rounded-2xl"
                />
                <Button
                  onClick={handleRequestCode}
                  disabled={requestingCode || !email}
                  className="w-full rounded-2xl bg-uiuc-navy font-black uppercase tracking-widest text-white hover:bg-uiuc-navy/90"
                >
                  {requestingCode ? "Sending..." : "Send verification code"}
                </Button>
              </div>
            </div>

            <div className="rounded-[28px] bg-gray-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                Step 2
              </p>
              <h4 className="mt-2 text-xl font-black uppercase tracking-tighter text-uiuc-navy">
                Confirm the code
              </h4>
              <p className="mt-3 text-sm font-medium leading-7 text-gray-500">
                Once verified, you can save drafts right away. Connecting X later is optional.
              </p>
              <div className="mt-5 space-y-3">
                <Input
                  value={verificationCode}
                  onChange={(event) =>
                    setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  className="h-12 rounded-2xl text-center text-2xl font-black tracking-[0.4em]"
                />
                <Button
                  onClick={handleVerifyCode}
                  disabled={verifyingCode || verificationCode.length !== 6 || !verificationToken}
                  className="w-full rounded-2xl bg-uiuc-orange font-black uppercase tracking-widest text-white hover:bg-uiuc-orange/90"
                >
                  {verifyingCode ? "Verifying..." : "Verify and unlock drafts"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <div className="rounded-[28px] bg-gray-50 p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-uiuc-orange" />
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                      Verified session
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-bold text-uiuc-navy">{session.email}</p>
                </div>

                {account?.account ? (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="rounded-2xl bg-white px-5 py-4">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-400">
                        Connected X account
                      </p>
                      <p className="mt-2 text-lg font-black text-uiuc-navy">
                        @{account.account.xUsername}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleDisconnect}
                      disabled={disconnecting}
                      className="rounded-full px-6 font-black uppercase tracking-widest"
                    >
                      <Unplug className="mr-2 h-4 w-4" />
                      {disconnecting ? "Disconnecting..." : "Disconnect X"}
                    </Button>
                  </div>
                ) : account?.configReady ? (
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <div className="rounded-2xl bg-white px-5 py-4">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-400">
                        Optional upgrade
                      </p>
                      <p className="mt-2 text-sm font-bold text-uiuc-navy">
                        Connect X only if you want one-click publishing.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="rounded-full bg-uiuc-navy px-6 font-black uppercase tracking-widest text-white hover:bg-uiuc-navy/90"
                    >
                      <a href="/api/x/oauth/start">
                        <PlugZap className="mr-2 h-4 w-4" />
                        Connect X account
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm font-bold text-blue-700">
                    Draft-only mode is ready. You can save drafts now and use Open in X to post
                    manually whenever you want.
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                      Draft composer
                    </p>
                    <h4 className="mt-2 text-2xl font-black uppercase tracking-tighter text-uiuc-navy">
                      Pre-make your X posts
                    </h4>
                  </div>
                  <Badge
                    className={
                      remainingCharacters < 0
                        ? "bg-red-100 text-red-700 hover:bg-red-100"
                        : "bg-gray-100 text-uiuc-navy hover:bg-gray-100"
                    }
                  >
                    {remainingCharacters} chars left
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <Textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Write your X post draft here. It saves inside Apt.ly first."
                    className="min-h-[180px] rounded-[24px] border-gray-200 px-4 py-4 text-base"
                  />

                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-gray-400">
                        Scheduled for (optional)
                      </label>
                      <Input
                        type="datetime-local"
                        value={scheduledFor}
                        onChange={(event) => setScheduledFor(event.target.value)}
                        className="h-12 rounded-2xl"
                      />
                    </div>
                    <Button
                      onClick={handleSaveDraft}
                      disabled={savingDraft || isTextInvalid}
                      className="h-12 rounded-2xl bg-uiuc-orange px-8 font-black uppercase tracking-widest text-white hover:bg-uiuc-orange/90"
                    >
                      {savingDraft ? "Saving..." : "Save draft"}
                    </Button>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">
                    Saving a draft never sends it anywhere. Posting only happens later, by choice.
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-uiuc-orange">
                  Draft queue
                </p>
                <h4 className="mt-2 text-2xl font-black uppercase tracking-tighter text-uiuc-navy">
                  Review before posting
                </h4>

                <div className="mt-6 space-y-4">
                  {drafts.length === 0 ? (
                    <div className="rounded-[24px] border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                      <p className="text-sm font-black uppercase tracking-[0.22em] text-gray-400">
                        No drafts yet
                      </p>
                    </div>
                  ) : (
                    drafts.map((draft) => (
                      <div key={draft.id} className="rounded-[24px] bg-gray-50 p-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className="bg-uiuc-navy text-white hover:bg-uiuc-navy">
                            {draft.status}
                          </Badge>
                          {draft.scheduled_for ? (
                            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">
                              <CalendarClock className="h-4 w-4 text-uiuc-orange" />
                              {new Date(draft.scheduled_for).toLocaleString()}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-4 text-sm font-medium leading-7 text-gray-700">
                          {draft.text}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">
                          <span>Created {new Date(draft.created_at).toLocaleString()}</span>
                          {draft.published_post_id ? (
                            <span>X post ID: {draft.published_post_id}</span>
                          ) : null}
                        </div>

                        {draft.last_error ? (
                          <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-700">
                            {draft.last_error}
                          </div>
                        ) : null}

                        <div className="mt-5 flex flex-wrap gap-3">
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-full px-6 font-black uppercase tracking-widest"
                          >
                            <a
                              href={buildTweetIntentUrl(draft.text)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open in X
                            </a>
                          </Button>

                          {draft.status !== "published" ? (
                            account?.account && account.configReady ? (
                              <Button
                                onClick={() => handlePublishDraft(draft.id)}
                                disabled={publishingDraftId === draft.id}
                                className="rounded-full bg-uiuc-navy px-6 font-black uppercase tracking-widest text-white hover:bg-uiuc-navy/90"
                              >
                                {publishingDraftId === draft.id ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Publishing...
                                  </>
                                ) : (
                                  <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Publish to X
                                  </>
                                )}
                              </Button>
                            ) : null
                          ) : (
                            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-green-700">
                              <CheckCircle2 className="h-4 w-4" />
                              Published
                            </div>
                          )}

                          {draft.status === "failed" ? (
                            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-red-700">
                              <XCircle className="h-4 w-4" />
                              Publish failed
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
