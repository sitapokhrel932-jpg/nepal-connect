export const mockUsers = [
  { id: "u1", name: "Aarav Shrestha", email: "aarav@mail.com", city: "Kathmandu", joinDate: "2025-11-02", totalBookings: 12, status: "active" as const },
  { id: "u2", name: "Sita Gurung", email: "sita.g@mail.com", city: "Pokhara", joinDate: "2025-12-14", totalBookings: 5, status: "active" as const },
  { id: "u3", name: "Bikash Thapa", email: "bikash@mail.com", city: "Lalitpur", joinDate: "2026-01-08", totalBookings: 3, status: "suspended" as const },
  { id: "u4", name: "Priya Maharjan", email: "priya.m@mail.com", city: "Bhaktapur", joinDate: "2026-01-22", totalBookings: 8, status: "active" as const },
  { id: "u5", name: "Ramesh KC", email: "ramesh.kc@mail.com", city: "Biratnagar", joinDate: "2026-02-05", totalBookings: 1, status: "active" as const },
  { id: "u6", name: "Anita Rai", email: "anita.rai@mail.com", city: "Kathmandu", joinDate: "2026-02-18", totalBookings: 0, status: "active" as const },
];

export const mockProviders = [
  { id: "p1", name: "Deepak Tamang", service: "Plumber", city: "Kathmandu", rating: 4.7, totalJobs: 84, totalEarned: 126000, status: "approved" as const },
  { id: "p2", name: "Sunil Magar", service: "Electrician", city: "Lalitpur", rating: 4.5, totalJobs: 62, totalEarned: 93000, status: "approved" as const },
  { id: "p3", name: "Hari Basnet", service: "Carpenter", city: "Pokhara", rating: 4.8, totalJobs: 45, totalEarned: 72000, status: "approved" as const },
  { id: "p4", name: "Kiran Lama", service: "Mechanic", city: "Biratnagar", rating: 0, totalJobs: 0, totalEarned: 0, status: "pending" as const },
  { id: "p5", name: "Binod Sherpa", service: "Painter", city: "Kathmandu", rating: 4.2, totalJobs: 28, totalEarned: 42000, status: "suspended" as const },
  { id: "p6", name: "Manoj Adhikari", service: "Plumber", city: "Bharatpur", rating: 0, totalJobs: 0, totalEarned: 0, status: "pending" as const },
];

export const mockBookings = [
  { id: "B-1001", customer: "Aarav Shrestha", provider: "Deepak Tamang", service: "Plumber", city: "Kathmandu", price: 2500, commission: 1000, status: "completed" as const, date: "2026-03-18" },
  { id: "B-1002", customer: "Sita Gurung", provider: "Hari Basnet", service: "Carpenter", city: "Pokhara", price: 3500, commission: 1400, status: "completed" as const, date: "2026-03-19" },
  { id: "B-1003", customer: "Priya Maharjan", provider: "Sunil Magar", service: "Electrician", city: "Lalitpur", price: 1800, commission: 720, status: "active" as const, date: "2026-03-20" },
  { id: "B-1004", customer: "Bikash Thapa", provider: "Deepak Tamang", service: "Plumber", city: "Kathmandu", price: 2000, commission: 800, status: "disputed" as const, date: "2026-03-20" },
  { id: "B-1005", customer: "Ramesh KC", provider: "Kiran Lama", service: "Mechanic", city: "Biratnagar", price: 4500, commission: 1800, status: "pending" as const, date: "2026-03-21" },
  { id: "B-1006", customer: "Aarav Shrestha", provider: "Sunil Magar", service: "Electrician", city: "Kathmandu", price: 1500, commission: 600, status: "cancelled" as const, date: "2026-03-17" },
  { id: "B-1007", customer: "Anita Rai", provider: "Hari Basnet", service: "Carpenter", city: "Kathmandu", price: 5000, commission: 2000, status: "completed" as const, date: "2026-03-16" },
];

export const mockDisputes = [
  { id: "D-01", bookingId: "B-1004", customer: "Bikash Thapa", provider: "Deepak Tamang", service: "Plumber", price: 2000, complaint: "Provider arrived 2 hours late and left the repair incomplete. Water is still leaking from the pipe joint.", date: "2026-03-20", status: "open" as const },
  { id: "D-02", bookingId: "B-1006", customer: "Aarav Shrestha", provider: "Sunil Magar", service: "Electrician", price: 1500, complaint: "Provider cancelled after accepting the booking. I had to find another electrician on my own.", date: "2026-03-17", status: "open" as const },
];

export const mockEarnings = {
  totalRevenue: 344800,
  totalCommission: 137920,
  monthlyBreakdown: [
    { month: "Oct 2025", revenue: 38200, commission: 15280 },
    { month: "Nov 2025", revenue: 45600, commission: 18240 },
    { month: "Dec 2025", revenue: 52100, commission: 20840 },
    { month: "Jan 2026", revenue: 61400, commission: 24560 },
    { month: "Feb 2026", revenue: 72300, commission: 28920 },
    { month: "Mar 2026", revenue: 75200, commission: 30080 },
  ],
  recentPayouts: [
    { id: "PO-01", provider: "Deepak Tamang", amount: 1500, date: "2026-03-18", booking: "B-1001" },
    { id: "PO-02", provider: "Hari Basnet", amount: 2100, date: "2026-03-19", booking: "B-1002" },
    { id: "PO-03", provider: "Hari Basnet", amount: 3000, date: "2026-03-16", booking: "B-1007" },
  ],
};

export const weeklyBookings = [
  { day: "Sun", count: 4 },
  { day: "Mon", count: 7 },
  { day: "Tue", count: 5 },
  { day: "Wed", count: 9 },
  { day: "Thu", count: 6 },
  { day: "Fri", count: 11 },
  { day: "Sat", count: 8 },
];
