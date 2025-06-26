import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "Create Your Profile",
    description:
      "Sign up and complete your profile to get personalized legal recommendations and services.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "Book Appointments",
    description:
      "Browse lawyer profiles, check availability, and book appointments that fit your schedule.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "Video Consultation",
    description:
      "Connect with lawyers through secure, high-quality video consultations from the comfort of your home.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "Consultation Credits",
    description:
      "Purchase credit packages that fit your legal needs with our simple subscription model.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Verified Lawyers",
    description:
      "All justice providers are carefully vetted and verified to ensure legal support.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "Legal Documentation",
    description:
      "Access and manage your appointment history, lawyer's notes, and legal recommendations.",
  },
];

export const adminFeatures = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Verify Lawyers",
    description:
      "Review lawyer applications, verify credentials, and approve or reject registrations for platform integrity.",
  },
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "Manage Users",
    description:
      "Monitor client and lawyer activity, handle reports or violations, and ensure a safe and respectful environment.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "Access Logs & Reports",
    description:
      "Access detailed logs, appointment records, and reports for platform oversight and legal compliance.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "Oversee Payments",
    description:
      "Track credit purchases, monitor transactions, and manage payment disputes or issues with transparency.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "Monitor Consultations",
    description:
      "Access anonymized video consultation metadata to ensure quality control and service standards.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "System Scheduling",
    description:
      "Set platform-wide availability windows, blackout periods, or emergency notices for all users.",
  },
];


// JSON data for testimonials
export const testimonials = [
  {
    initials: "SP",
    name: "Sarah Parker",
    role: "Client",
    quote:
      "The video consultation feature saved me so much time. I was able to get legal advice without taking time off work or traveling to a firms.",
  },
  {
    initials: "RM",
    name: " Robert McGill",
    role: "Lawyer",
    quote:
      "This platform has revolutionized my practice. I can now reach more clients and provide timely service without the constraints of a physical office.",
  },
  {
    initials: "JT",
    name: "James Taylor",
    role: "Client",
    quote:
      "The credit system is so convenient. I purchased a package for my family, and we've been able to consult with attorney whenever needed.",
  },
];

// JSON data for credit system benefits
export const creditBenefitsLawyers = [
  "Earn <strong class='text-emerald-400'>2 credits</strong> for every completed consultation or appointment",
  "Credits can be <strong class='text-emerald-400'>payout at any time</strong> to your bank account",
  "Get notified when <strong class='text-emerald-400'>new consultation requests</strong> match your expertise",
  "<strong class='text-emerald-400'>Maintain full control</strong> — set your availability and manage appointments",
];


export const creditBenefitsClients = [
  "Each consultation requires <strong class='text-emerald-400'>2 credits</strong> regardless of duration",
  "Credits <strong class='text-emerald-400'>never expire</strong> - use them whenever you need",
  "Monthly subscriptions give you <strong class='text-emerald-400'>fresh credits every month</strong>",
  "Cancel or change your subscription <strong class='text-emerald-400'>anytime</strong> without penalties",
];