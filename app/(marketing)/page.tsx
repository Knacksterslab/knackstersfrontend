import type { Metadata } from "next";
import CallToAction from "@/components/sections/CallToAction";
import SolutionsComponent from "@/components/sections/SolutionsComponent";
import BenefitsComponent from "@/components/sections/BenefitsComponent";
import UseCases from "@/components/sections/UseCases";
import Banner from "@/components/sections/banner";
import ProcessFlowComponent from "@/components/process-flow/ProcessFlowComponent";
import Scroller from "@/components/shared/Scroller";
import PartnersComponent from "@/components/partners/PartnersComponent";
import { defaultLandingContent, LandingContent } from "@/components/landing/landing-content";

// Force dynamic rendering and revalidation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching

export const metadata: Metadata = {
  title: defaultLandingContent.seo.pageTitle,
  description: defaultLandingContent.seo.metaDescription,
  keywords: [
    "talent network",
    "professional networking",
    "skilled professionals",
    "talent recruitment",
    "career opportunities",
  ],
};

// Fetch talent cards server-side
async function getTalentCards() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:29',message:'getTalentCards START',data:{env_api_url:process.env.NEXT_PUBLIC_API_URL,computed_url:process.env.NEXT_PUBLIC_API_URL||'http://localhost:5000'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,D'})}).catch(()=>{});
  // #endregion
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:32',message:'Fetching from API',data:{full_url:`${apiUrl}/api/public/content/landing-hero`},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,D'})}).catch(()=>{});
    // #endregion
    
    const response = await fetch(`${apiUrl}/api/public/content/landing-hero`, {
      cache: 'no-store', // Always fetch fresh data
      next: { revalidate: 0 },
    });

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:37',message:'Fetch response received',data:{ok:response.ok,status:response.status,statusText:response.statusText},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    if (response.ok) {
      const data = await response.json();
      
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:39',message:'Response data parsed',data:{success:data.success,has_data:!!data.data,has_content:!!data.data?.content,has_cards:!!data.data?.content?.talentCards,cards_count:data.data?.content?.talentCards?.length,first_card_image:data.data?.content?.talentCards?.[0]?.image},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B,E'})}).catch(()=>{});
      // #endregion
      
      if (data.success && data.data?.content?.talentCards) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:41',message:'Returning fetched cards',data:{cards_count:data.data.content.talentCards.length,cards:data.data.content.talentCards.map((c:any)=>({id:c.id,name:c.name,image:c.image}))},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        return data.data.content.talentCards;
      }
    }
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:44',message:'Fetch error caught',data:{error_message:error instanceof Error?error.message:String(error),error_type:error?.constructor?.name},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    console.error('Failed to fetch talent cards server-side:', error);
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:48',message:'Returning default fallback cards',data:{default_count:defaultLandingContent.hero.talentCards.length,first_default_image:defaultLandingContent.hero.talentCards[0]?.image},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,C'})}).catch(()=>{});
  // #endregion
  
  // Return default cards as fallback
  return defaultLandingContent.hero.talentCards;
}

export default async function Home() {
  const talentCards = await getTalentCards();
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/b64e0ab6-7d71-4fbd-bdcc-a8b7f534a7a1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'page.tsx:52',message:'Home component rendering',data:{cards_count:talentCards.length,cards_passed_to_banner:talentCards.map((c:any)=>({id:c.id,name:c.name,image:c.image}))},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C,E'})}).catch(()=>{});
  // #endregion

  return (
    <>
      <Banner talentCards={talentCards} />
      <div className="flex justify-center py-8">
        <Scroller />
      </div>
      <ProcessFlowComponent />
      <PartnersComponent />
      <SolutionsComponent />
      <BenefitsComponent />
      <UseCases />
      <CallToAction />
    </>
  );
}

