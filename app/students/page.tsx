"use client";

import { useState, useEffect, FormEvent } from "react";
import { 
  Trash2, 
  Edit, 
  Plus, 
  Save, 
  X, 
  Users, 
  AlertCircle,
  Loader2
} from "lucide-react";

interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
}

export default function StudentManagementPage() {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://student-management-system-be.onrender.com/api/students";

  const emptyForm: Student = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // ---------------------------------------------------------
  // READ: Fetch all students
  // ---------------------------------------------------------
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Failed to fetch students: ${res.status}`);
      }

      const data: Student[] = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load students. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ---------------------------------------------------------
  // CREATE & UPDATE
  // ---------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      let res: Response;

      if (editingId !== null) {
        // UPDATE
        res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        // CREATE
        res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) {
        throw new Error(
          `${editingId !== null ? "Update" : "Create"} failed: ${res.status}`
        );
      }

      // Reset form
      setFormData(emptyForm);
      setEditingId(null);

      // Refresh table
      await fetchStudents();
    } catch (err) {
      console.error(err);
      setError("Operation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setError("");
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      await fetchStudents();
    } catch (err) {
      console.error(err);
      setError("Failed to delete student.");
    }
  };

  // ---------------------------------------------------------
  // EDIT
  // ---------------------------------------------------------
  const handleEdit = (student: Student) => {
    if (!student.id) return;

    setEditingId(student.id);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      dateOfBirth: student.dateOfBirth,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ---------------------------------------------------------
  // CANCEL EDIT
  // ---------------------------------------------------------
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-5 pt-0 mt-0">
         
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Student Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage student records, update information, and keep track of enrollments.
            </p>
          </div>
        </div>

        {/* Error Message Alert */}
        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 animate-in fade-in slide-in-from-top-4">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all">
          <div className="bg-slate-50/50 border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              {editingId !== null ? (
                <>
                  <Edit size={18} className="text-indigo-600" /> 
                  Edit Student Record
                </>
              ) : (
                <>
                  <Plus size={18} className="text-indigo-600" /> 
                  Add New Student
                </>
              )}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">First Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kamal"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Last Name</label>
                <input
                  type="text"
                  placeholder="e.g. Perera"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input
                  type="email"
                  placeholder="kamal@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="077 123 4567"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-700"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-1 space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Home Address</label>
                <input
                  type="text"
                  placeholder="123 Main Street, City"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8 pt-5 border-t border-slate-100">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 
                         disabled:bg-indigo-300 text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-colors focus:ring-2 
                         focus:ring-offset-2 focus:ring-indigo-600"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Saving...</>
                ) : editingId !== null ? (
                  <><Save size={16} /> Update Record</>
                ) : (
                  <><Plus size={16} /> Add Student</>
                )}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 
                           hover:bg-slate-50 hover:text-slate-900 text-sm font-medium py-2.5 px-5 rounded-lg transition-colors
                           focus:ring-2 focus:ring-offset-2 focus:ring-slate-200"
                >
                  <X size={16} /> Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Data Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">DOB</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {/* Loading State */}
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Loader2 size={32} className="animate-spin mb-3 text-indigo-500" />
                        <p>Loading student directory...</p>
                      </div>
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  /* Empty State */
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                          <Users size={24} className="text-slate-400" />
                        </div>
                        <p className="text-base font-medium text-slate-900 mb-1">No students found</p>
                        <p className="text-sm">Get started by adding a new student above.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  /* Data Rows */
                  students.map((student) => (
                    <tr 
                      key={student.id} 
                      className={`hover:bg-slate-50 transition-colors ${editingId === student.id ? 'bg-indigo-50/30' : ''}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        #{student.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {student.firstName} {student.lastName}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-slate-600">{student.email}</span>
                          <span className="text-slate-500 text-xs">{student.phoneNumber}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 truncate max-w-[200px]" title={student.address}>
                        {student.address}
                      </td>

                      <td className="px-6 py-4">
                        {student.dateOfBirth}
                      </td>

                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            title="Edit student"
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => student.id !== undefined && handleDelete(student.id)}
                            title="Delete student"
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}