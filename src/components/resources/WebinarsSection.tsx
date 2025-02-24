// "use client";

// import { Calendar, Clock } from "lucide-react";

// const events = [
//   {
//     title: "Getting Started with Generative AI",
//     description: "Learn the basics of implementing generative AI in your enterprise.",
//     date: "March 15, 2024",
//     time: "2:00 PM EST",
//     type: "Webinar",
//   },
//   {
//     title: "TRiSM Framework Workshop",
//     description: "Hands-on workshop on implementing the TRiSM framework.",
//     date: "March 22, 2024",
//     time: "11:00 AM EST",
//     type: "Workshop",
//   },
//   {
//     title: "Open Source AI Tools Deep Dive",
//     description: "Technical deep dive into popular open-source AI tools.",
//     date: "April 5, 2024",
//     time: "1:00 PM EST",
//     type: "Webinar",
//   },
// ];

// export function WebinarsSection() {
//   return (
//     <section className="container py-24">
//       <div className="mx-auto max-w-[58rem] text-center">
//         <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
//           Webinars &{" "}
//           <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
//             Workshops
//           </span>
//         </h2>
//       </div>

//       <div className="mx-auto mt-16 grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-3">
//         {events.map((event) => (
//           <div
//             key={event.title}
//             className="relative overflow-hidden rounded-lg border bg-background p-2"
//           >
//             <div className="flex h-full flex-col justify-between rounded-md p-6">
//               <div>
//                 <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
//                   {event.type}
//                 </div>
//                 <h3 className="font-bold">{event.title}</h3>
//                 <p className="mt-2 text-muted-foreground">
//                   {event.description}
//                 </p>
//               </div>
//               <div className="mt-4 space-y-2">
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <Calendar className="mr-2 h-4 w-4" />
//                   {event.date}
//                 </div>
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <Clock className="mr-2 h-4 w-4" />
//                   {event.time}
//                 </div>
//                 <button
//                   className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                   onClick={() => {
//                     // TODO: Implement registration functionality
//                     alert("Registration functionality will be implemented");
//                   }}
//                 >
//                   Register Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// } 

"use client";
import React from "react";

const webinars = [
  {
    title: "Unlocking the Potential of Generative AI",
    description: "Join our upcoming webinar to explore the latest trends in AI.",
    link: "/webinars/unlocking-generative-ai"
  }
];

export function WebinarsSection() {
  const handleJoinWebinar = (link: string) => {
    window.location.href = link;
  };
  return (
    <section className="my-5 p-5 bg-white rounded-lg shadow-sm" id="webinars">
    <h2 className="text-[#0073e6] text-2xl font-bold mb-5">Webinars & Workshops</h2>
    <div className="flex flex-wrap gap-5">
      {webinars.map((webinar, index) => (
        <div key={index} className="flex-1 basis-[300px] bg-white border border-[#ddd] rounded-lg overflow-hidden text-center">
          <div className="p-5">
            <img src="/api/placeholder/300/200" alt="Webinar" className="w-full h-auto rounded-lg mb-4"/>
            <h3 className="text-xl font-bold mb-3 text-[#333]">{webinar.title}</h3>
            <p className="text-[#666] mb-4">{webinar.description}</p>
            <button 
              onClick={() => handleJoinWebinar(webinar.link)}
              className="inline-block bg-[#ff9900] text-white px-6 py-2 rounded-md font-bold hover:bg-[#e68a00] transition-colors cursor-pointer">
              Join Our Webinar
            </button>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}