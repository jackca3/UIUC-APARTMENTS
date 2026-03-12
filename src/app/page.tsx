"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building, Star, MapPin } from "lucide-react";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getApartments } from "@/lib/api";
import { Apartment } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ApartmentCard } from "@/components/apartment-card";

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q")?.toString() || "";
    if (query.trim()) {
      router.push(`/apartments?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/apartments");
    }
  };

  useEffect(() => {
    async function loadData() {
      const _apts = await getApartments();
      setApartments(_apts.slice(0, 6)); // Featured apartments
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="bg-uiuc-navy py-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 text-left">
            <Badge className="bg-uiuc-orange/20 text-uiuc-orange hover:bg-uiuc-orange/30 mb-6 px-4 py-1">
              Verified @illinois.edu students only
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
              Find your perfect <br/><span className="text-uiuc-orange underline decoration-[8px] underline-offset-[10px]">apartment.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl font-medium leading-relaxed italic">
              "Real reviews from verified UIUC students."
            </p>
          </div>

          <div className="w-full md:w-[500px] shrink-0">
            <div className="bg-white p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-uiuc-navy uppercase tracking-tighter">Quick Search</h3>
                <p className="text-gray-500 font-medium text-sm">Find your next home by building, address, or management.</p>
              </div>
              <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="flex-1 flex items-center px-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <Search className="h-6 w-6 text-gray-400 mr-3" />
                  <Input
                    type="text"
                    name="q"
                    placeholder="Search Apt.ly..."
                    className="border-0 focus-visible:ring-0 shadow-none text-black h-16 text-lg px-0 bg-transparent placeholder:text-gray-400 font-bold"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-uiuc-orange hover:bg-uiuc-orange/90 text-white rounded-2xl h-16 text-lg font-black shadow-lg uppercase tracking-widest transition-transform hover:scale-[1.02]">
                  Explore Apartments
                </Button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-uiuc-navy mb-2 uppercase tracking-tighter">Verified Listings</h2>
              <p className="text-gray-500 font-medium">Real imagery and verified student reports</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex font-bold text-uiuc-orange hover:text-uiuc-orange/80">
              <Link href="/apartments">View all <span className="ml-2 font-black">&rarr;</span></Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[400px] bg-white animate-pulse rounded-2xl border border-gray-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apartments.map((apt) => (
                <ApartmentCard 
                    key={apt.id} 
                    apartment={apt} 
                    reviewCount={apt.id === 'a1' ? 1 : 0} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-black text-uiuc-navy uppercase tracking-tighter">Built for UIUC Students</h2>
            <div className="grid md:grid-cols-3 gap-12 text-left">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                  <Star className="h-6 w-6" />
                </div>
                <h4 className="font-black text-xl uppercase tracking-tighter">Verified Reviews Only</h4>
                <p className="text-gray-500 font-medium leading-relaxed">Every review comes from a verified <span className="font-bold text-uiuc-navy">@illinois.edu</span> student. No landlords, no bots, no fake accounts.</p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 bg-uiuc-orange/10 rounded-2xl flex items-center justify-center text-uiuc-orange">
                  <Building className="h-6 w-6" />
                </div>
                <h4 className="font-black text-xl uppercase tracking-tighter">No Landlord Influence</h4>
                <p className="text-gray-500 font-medium leading-relaxed">Leasing companies cannot pay to boost their ratings or hide bad reviews. What you read is what students actually experienced.</p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <h4 className="font-black text-xl uppercase tracking-tighter">One Review Per Tenant</h4>
                <p className="text-gray-500 font-medium leading-relaxed">Each student can only review a building they've lived in — once. Ratings stay honest and reflective of real experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
