export interface Customer {
  id: string;
  name: string;
  age: number;
  accountType: string;
  productsUsed: string[];
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High";
  lastActivity: string;
  upiFrequency: number;
  cardTransactions: number;
  avgTransactionValue: number;
  mobileLoginFrequency: number;
  daysSinceLastLogin: number;
  appActivityLevel: string;
  loansTaken: number;
  emiStatus: string;
  creditCardUsage: string;
  complaintCount: number;
  sentimentScore: number;
  lastComplaint: string;
  aiRiskReasons: string[];
}

export const customers: Customer[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    age: 34,
    accountType: "Savings Premium",
    productsUsed: ["Savings Account", "Credit Card", "Personal Loan", "UPI"],
    riskScore: 0.82,
    riskLevel: "High",
    lastActivity: "3 days ago",
    upiFrequency: 2,
    cardTransactions: 3,
    avgTransactionValue: 1200,
    mobileLoginFrequency: 1,
    daysSinceLastLogin: 3,
    appActivityLevel: "Low",
    loansTaken: 2,
    emiStatus: "1 Overdue",
    creditCardUsage: "12% of limit",
    complaintCount: 4,
    sentimentScore: 0.28,
    lastComplaint: "Disputed charge on credit card",
    aiRiskReasons: [
      "Mobile app login dropped 70% in last 30 days",
      "UPI transaction frequency down from 15/week to 2/week",
      "Negative sentiment in last 3 complaints",
      "EMI payment overdue by 12 days",
      "Credit card usage dropped significantly",
    ],
  },
  {
    id: "2",
    name: "Priya Patil",
    age: 28,
    accountType: "Savings Regular",
    productsUsed: ["Savings Account", "Debit Card", "FD"],
    riskScore: 0.41,
    riskLevel: "Medium",
    lastActivity: "1 day ago",
    upiFrequency: 8,
    cardTransactions: 12,
    avgTransactionValue: 3400,
    mobileLoginFrequency: 4,
    daysSinceLastLogin: 1,
    appActivityLevel: "Medium",
    loansTaken: 0,
    emiStatus: "N/A",
    creditCardUsage: "N/A",
    complaintCount: 1,
    sentimentScore: 0.55,
    lastComplaint: "ATM withdrawal issue",
    aiRiskReasons: [
      "Salary credit amount decreased by 20%",
      "Increased cash withdrawals from ATM",
      "FD renewal not initiated despite maturity",
    ],
  },
  {
    id: "3",
    name: "Amit Deshmukh",
    age: 45,
    accountType: "Current Account",
    productsUsed: ["Current Account", "Credit Card", "Business Loan", "UPI", "Insurance"],
    riskScore: 0.15,
    riskLevel: "Low",
    lastActivity: "Today",
    upiFrequency: 22,
    cardTransactions: 18,
    avgTransactionValue: 8500,
    mobileLoginFrequency: 12,
    daysSinceLastLogin: 0,
    appActivityLevel: "High",
    loansTaken: 1,
    emiStatus: "On Track",
    creditCardUsage: "45% of limit",
    complaintCount: 0,
    sentimentScore: 0.92,
    lastComplaint: "None",
    aiRiskReasons: [
      "Stable and growing transaction pattern",
      "High engagement across all channels",
    ],
  },
  {
    id: "4",
    name: "Sneha Kulkarni",
    age: 31,
    accountType: "Savings Premium",
    productsUsed: ["Savings Account", "Credit Card", "Mutual Funds"],
    riskScore: 0.67,
    riskLevel: "High",
    lastActivity: "5 days ago",
    upiFrequency: 4,
    cardTransactions: 6,
    avgTransactionValue: 2100,
    mobileLoginFrequency: 2,
    daysSinceLastLogin: 5,
    appActivityLevel: "Low",
    loansTaken: 1,
    emiStatus: "On Track",
    creditCardUsage: "8% of limit",
    complaintCount: 3,
    sentimentScore: 0.35,
    lastComplaint: "App crash during fund transfer",
    aiRiskReasons: [
      "App activity dropped 60% month-over-month",
      "Mutual fund SIP stopped without reason",
      "Multiple app-related complaints filed",
      "Credit card spending at historic low",
    ],
  },
  {
    id: "5",
    name: "Vikram Joshi",
    age: 52,
    accountType: "Savings Regular",
    productsUsed: ["Savings Account", "FD", "RD"],
    riskScore: 0.33,
    riskLevel: "Medium",
    lastActivity: "2 days ago",
    upiFrequency: 5,
    cardTransactions: 8,
    avgTransactionValue: 4200,
    mobileLoginFrequency: 3,
    daysSinceLastLogin: 2,
    appActivityLevel: "Medium",
    loansTaken: 0,
    emiStatus: "N/A",
    creditCardUsage: "N/A",
    complaintCount: 1,
    sentimentScore: 0.62,
    lastComplaint: "Interest rate inquiry",
    aiRiskReasons: [
      "Large withdrawal pattern in last 2 months",
      "FD premature closure inquiry raised",
    ],
  },
  {
    id: "6",
    name: "Meera Nair",
    age: 26,
    accountType: "Salary Account",
    productsUsed: ["Salary Account", "Debit Card", "UPI"],
    riskScore: 0.12,
    riskLevel: "Low",
    lastActivity: "Today",
    upiFrequency: 30,
    cardTransactions: 20,
    avgTransactionValue: 1800,
    mobileLoginFrequency: 15,
    daysSinceLastLogin: 0,
    appActivityLevel: "High",
    loansTaken: 0,
    emiStatus: "N/A",
    creditCardUsage: "N/A",
    complaintCount: 0,
    sentimentScore: 0.88,
    lastComplaint: "None",
    aiRiskReasons: [
      "Consistently high engagement",
      "Growing transaction volume month-over-month",
    ],
  },
];
