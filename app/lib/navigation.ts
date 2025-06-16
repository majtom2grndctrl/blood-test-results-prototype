export interface NavItem {
  title: string;
  href: string;
  iconName?: string;
  subItems?: NavItem[];
}

export const navigationItems: NavItem[] = [
  {
    title: "Home Dashboard",
    href: "/dashboard",
    iconName: "Home",
  },
  {
    title: "Medical Records",
    href: "/medical-records",
    iconName: "FolderOpen",
    subItems: [
      { title: "Health Summary", href: "/medical-records/health-summary" },
      { title: "Diagnoses & Conditions", href: "/medical-records/diagnoses" },
      { title: "Test Results", href: "/medical-records/test-results" },
      { title: "Visit Summaries", href: "/medical-records/visit-summaries" },
      { title: "Care Team Information", href: "/medical-records/care-team" },
      { title: "Family/Caregiver Access", href: "/medical-records/family-access" },
    ],
  },
  {
    title: "Medications",
    href: "/medications",
    iconName: "Pill",
    subItems: [
      { title: "Current Medications", href: "/medications/current" },
      { title: "Medication History", href: "/medications/history" },
      { title: "Request Refills", href: "/medications/refills" },
      { title: "Pharmacy Preferences", href: "/medications/pharmacy" },
    ],
  },
  {
    title: "Appointments",
    href: "/appointments",
    iconName: "Calendar",
    subItems: [
      { title: "Schedule New Appointment", href: "/appointments/schedule" },
      { title: "Upcoming Appointments", href: "/appointments/upcoming" },
      { title: "Past Appointments", href: "/appointments/past" },
      { title: "Pre-Visit Forms", href: "/appointments/forms" },
    ],
  },
  {
    title: "Messaging",
    href: "/messaging",
    iconName: "MessageSquare",
    subItems: [
      { title: "Inbox", href: "/messaging/inbox" },
      { title: "Sent Messages", href: "/messaging/sent" },
      { title: "Drafts", href: "/messaging/drafts" },
      { title: "Symptom Reports", href: "/messaging/symptoms" },
    ],
  },
  {
    title: "Health Tracking",
    href: "/health-tracking",
    iconName: "Activity",
    subItems: [
      { title: "My Vitals", href: "/health-tracking/vitals" },
      { title: "Symptoms Journal", href: "/health-tracking/symptoms" },
      { title: "Health Goals", href: "/health-tracking/goals" },
      { title: "Connected Devices & Apps", href: "/health-tracking/devices" },
    ],
  },
  {
    title: "Preventive Care",
    href: "/preventive-care",
    iconName: "Heart",
    subItems: [
      { title: "Recommended Screenings", href: "/preventive-care/screenings" },
      { title: "Vaccination Records", href: "/preventive-care/vaccinations" },
      { title: "Health Assessments", href: "/preventive-care/assessments" },
      { title: "Wellness Plan", href: "/preventive-care/wellness" },
    ],
  },
  {
    title: "Billing & Insurance",
    href: "/billing",
    iconName: "Receipt",
    subItems: [
      { title: "Current Bills", href: "/billing/current" },
      { title: "Payment History", href: "/billing/history" },
      { title: "Insurance Information", href: "/billing/insurance" },
      { title: "Coverage Details", href: "/billing/coverage" },
    ],
  },
  {
    title: "Resources & Education",
    href: "/resources",
    iconName: "BookOpen",
    subItems: [
      { title: "Health Library", href: "/resources/library" },
      { title: "Condition-Specific Education", href: "/resources/conditions" },
      { title: "Video Resources", href: "/resources/videos" },
      { title: "Support Groups", href: "/resources/support" },
    ],
  },
]; 