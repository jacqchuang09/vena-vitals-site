// Shared people data. Lives here rather than inside a page component because
// the clinical advisors appear both on the Clinical Evidence page and in the
// team section on About — one source so the two can never drift apart.
export const advisors = [
  {
    name: "Joseph Rinehart, MD",
    role: "Anesthesiology",
    sub: "Clinical Advisor",
    img: "/assets/clinical/joseph.jpeg",
    url: "https://www.faculty.uci.edu/profile/?facultyId=6873",
    title:
      "Associate Professor & Vice Chair for Research, Anesthesiology & Perioperative Care, UC Irvine",
    bio: "An anesthesiologist and hemodynamics researcher at UC Irvine, Dr. Rinehart is a leader in perioperative goal-directed therapy and closed-loop systems for automated fluid and vasopressor management. His work centers on the continuous blood-pressure and hemodynamic signals that guide care in the operating room, the same signals VeriTrack captures noninvasively.",
  },
  {
    name: "Dawn Lombardo, DO",
    role: "Cardiology",
    img: "/assets/clinical/dawn.jpeg",
    url: "https://www.ucihealth.org/find-a-doctor/l/dawn-lombardo",
    title: "Professor of Cardiology & Medical Director, Heart Failure and LVAD Program, UC Irvine",
    bio: "Dr. Lombardo is a cardiologist in UC Irvine's Mary & Steve Wen Cardiovascular Division and Medical Director of the UCI Health Heart Failure & LVAD Program. An advanced heart-failure specialist, her research spans heart-failure management and cardiovascular imaging in women's heart disease.",
  },
  {
    name: "Shaista Malik, MD, PhD, MPH",
    role: "Preventive Cardiology",
    img: "/assets/clinical/shaista.jpg",
    avatar: "/assets/clinical/shaista-avatar.jpg",
    url: "https://ssihi.uci.edu/about/leadership/",
    title:
      "Preventive Cardiologist & Executive Director, Susan Samueli Integrative Health Institute, UC Irvine",
    bio: "A preventive cardiologist, Dr. Malik is Executive Director of UC Irvine's Susan Samueli Integrative Health Institute and founding Associate Vice Chancellor of the Samueli College of Health Sciences. Her NIH-funded research focuses on the early detection and prevention of heart disease, including imaging and biomarkers of women's cardiovascular risk.",
  },
  {
    name: "Gregory Washington, PhD",
    role: "Engineering",
    img: "/assets/clinical/gregory.webp",
    url: "https://president.gmu.edu/",
    title: "President, George Mason University; former Dean of Engineering, UC Irvine",
    bio: "A mechanical engineer and member of the National Academy of Engineering, Dr. Washington is President of George Mason University and previously served as Dean of Engineering at UC Irvine. His research spans dynamic systems, smart materials, and the sensing devices that turn physical signals into actionable data.",
  },
];

export type Advisor = (typeof advisors)[number];
