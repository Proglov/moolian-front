import { Shell } from "lucide-react";


// export default function Spinner() {
//     return (
//         <>
//             <style>
//                 {`@keyframes spin {
//             to {
//               transform: rotate(360deg);
//             }
//           }
//           @keyframes spin2 {
//             0% {
//               stroke-dasharray: 1, 800;
//               stroke-dashoffset: 0;
//             }
//             50% {
//               stroke-dasharray: 400, 400;
//               stroke-dashoffset: -200px;
//             }
//             100% {
//               stroke-dasharray: 800, 1;
//               stroke-dashoffset: -800px;
//             }
//           }

//           .spin2 {
//             transform-origin: center;
//             animation: spin2 1.5s ease-in-out infinite,
//               spin 2s linear infinite;
//             animation-direction: alternate;
//           }`}
//             </style>

//             <svg
//                 viewBox="0 0 800 800"
//                 className="h-14 w-14"
//                 xmlns="http://www.w3.org/2000/svg"
//             >
//                 <circle
//                     className="spin2 stroke-primary"
//                     cx="400"
//                     cy="400"
//                     fill="none"
//                     r="200"
//                     strokeWidth="30"
//                     strokeDasharray="700 1400"
//                     strokeLinecap="round"
//                     style={{ stroke: 'red' }}
//                 />
//             </svg>
//         </>
//     );
// }

// export default function Spinner() {
//     return (
//         <div className="flex items-center justify-center">
//             <svg
//                 className="h-8 w-8 animate-spin text-gray-900 dark:text-gray-50"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//             >
//                 <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 <path
//                     d="M17.1475 6.8525L16.0625 7.9375"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                 />
//                 <path d="M19.25 12H17.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 <path
//                     d="M17.1475 17.1475L16.0625 16.0625"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                 />
//                 <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 <path
//                     d="M6.8525 17.1475L7.9375 16.0625"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                 />
//                 <path d="M4.75 12H6.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 <path
//                     d="M6.8525 6.8525L7.9375 7.9375"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                 />
//             </svg>
//         </div>
//     );
// }

export default function Spinner() {
    return (
        <Shell className="animate-spin text-red-400" />
    );
}