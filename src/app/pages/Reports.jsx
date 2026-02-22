import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { 
  Search, 
  Download, 
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const leakRecords = [
    {
      id: "LEAK-2024-007",
      section: "Section A-7",
      gasLevel: 78,
      date: "2024-02-22 14:35",
      status: "Pending",
      severity: "High",
    },
    {
      id: "LEAK-2024-006",
      section: "Section B-3",
      gasLevel: 65,
      date: "2024-02-22 13:45",
      status: "Pending",
      severity: "Medium",
    },
    {
      id: "LEAK-2024-005",
      section: "Section A-5",
      gasLevel: 92,
      date: "2024-02-22 11:20",
      status: "Sealed",
      severity: "Critical",
    },
    {
      id: "LEAK-2024-004",
      section: "Section C-12",
      gasLevel: 45,
      date: "2024-02-21 16:10",
      status: "Sealed",
      severity: "Medium",
    },
    {
      id: "LEAK-2024-003",
      section: "Section B-8",
      gasLevel: 38,
      date: "2024-02-21 09:30",
      status: "Sealed",
      severity: "Low",
    },
    {
      id: "LEAK-2024-002",
      section: "Section A-2",
      gasLevel: 55,
      date: "2024-02-20 14:15",
      status: "Rejected",
      severity: "Medium",
    },
    {
      id: "LEAK-2024-001",
      section: "Section D-5",
      gasLevel: 72,
      date: "2024-02-20 08:45",
      status: "Sealed",
      severity: "High",
    },
  ];

  const filteredRecords = leakRecords.filter(record => {
    const matchesSearch = 
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.section.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || record.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Sealed":
        return <CheckCircle className="w-4 h-4 text-[#10b981]" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-[#f59e0b]" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-[#94a3b8]" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "text-[#ef4444] bg-[#ef4444]/10";
      case "High":
        return "text-[#f59e0b] bg-[#f59e0b]/10";
      case "Medium":
        return "text-[#3b82f6] bg-[#3b82f6]/10";
      case "Low":
        return "text-[#10b981] bg-[#10b981]/10";
      default:
        return "text-[#94a3b8] bg-[#94a3b8]/10";
    }
  };

  const handleExportPDF = () => {
    alert("PDF export functionality would be implemented here. In production, this would generate a detailed report of the filtered data.");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Reports & Data</h1>
        <p className="text-[#94a3b8]">Leak history and inspection records</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Total Leaks</p>
          <p className="text-2xl font-bold text-white">{leakRecords.length}</p>
        </Card>
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Sealed</p>
          <p className="text-2xl font-bold text-[#10b981]">
            {leakRecords.filter(r => r.status === "Sealed").length}
          </p>
        </Card>
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Pending</p>
          <p className="text-2xl font-bold text-[#f59e0b]">
            {leakRecords.filter(r => r.status === "Pending").length}
          </p>
        </Card>
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-4">
          <p className="text-sm text-[#94a3b8] mb-1">Rejected</p>
          <p className="text-2xl font-bold text-[#94a3b8]">
            {leakRecords.filter(r => r.status === "Rejected").length}
          </p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-[#1a1f2e] border-[#2d3748] p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
            <Input
              placeholder="Search by Leak ID or Section"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1e293b] border-[#2d3748] text-white"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-[#1e293b] border-[#2d3748] text-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#2d3748] text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Sealed">Sealed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Severity Filter */}
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="bg-[#1e293b] border-[#2d3748] text-white">
              <SelectValue placeholder="Filter by Severity" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e293b] border-[#2d3748] text-white">
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Export Button */}
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="bg-[#1a1f2e] border-[#2d3748]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#2d3748] hover:bg-[#1e293b]">
              <TableHead className="text-[#94a3b8]">Leak ID</TableHead>
              <TableHead className="text-[#94a3b8]">Pipeline Section</TableHead>
              <TableHead className="text-[#94a3b8]">Gas Level</TableHead>
              <TableHead className="text-[#94a3b8]">Date & Time</TableHead>
              <TableHead className="text-[#94a3b8]">Severity</TableHead>
              <TableHead className="text-[#94a3b8]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow 
                key={record.id} 
                className="border-[#2d3748] hover:bg-[#1e293b] transition-colors"
              >
                <TableCell className="font-mono text-white">{record.id}</TableCell>
                <TableCell className="text-white">{record.section}</TableCell>
                <TableCell>
                  <span className={`font-bold ${
                    record.gasLevel > 75 ? "text-[#ef4444]" :
                    record.gasLevel > 50 ? "text-[#f59e0b]" :
                    "text-[#10b981]"
                  }`}>
                    {record.gasLevel}%
                  </span>
                </TableCell>
                <TableCell className="text-[#94a3b8]">{record.date}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(record.severity)}`}>
                    {record.severity}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    <span className="text-white">{record.status}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredRecords.length === 0 && (
          <div className="p-12 text-center">
            <Filter className="w-12 h-12 text-[#94a3b8] mx-auto mb-4" />
            <p className="text-[#94a3b8]">No records match your filters</p>
          </div>
        )}
      </Card>
    </div>
  );
}
