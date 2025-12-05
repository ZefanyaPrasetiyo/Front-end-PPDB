"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useSession } from "next-auth/react";

export default function UserInfoCard() {
  const { data: session, status } = useSession();
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    phone: "",
    bio: "",
    role: "",
  });

  // Ambil inisial dari nama user
  const getInitial = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  // SET DATA SESSION KE FORM
  useEffect(() => {
    if (session?.user) {
      setForm({
        nama: session.user.name || "",
        email: session.user.email || "",
        role: session.user.role || "",
        phone: "",
        bio: "",
      });
    }
  }, [session]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving Changes...", form);
    closeModal();
  };

  if (status === "loading") {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div className="flex flex-col">

          {/* ➤ AVATAR INISIAL */}
          <div className="mb-5">
            <div className="w-20 h-20 rounded-full bg-gray-400 text-white flex items-center justify-center text-2xl font-bold shadow">
              {getInitial(form.nama)}
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Nama</p>
              <p className="text-sm font-medium">{form.nama}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium">{form.email}</p>
            </div>

            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Role</p>
              <p className="text-sm font-medium">{form.role}</p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 lg:w-auto"
        >
          Edit
        </button>
      </div>

      {/* MODAL EDIT */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold">Edit Personal Information</h4>
            <p className="mb-6 text-sm text-gray-500">Update your details.</p>
          </div>

          <form className="flex flex-col">
            <div className="h-[450px] overflow-y-auto px-2 pb-3 space-y-5">

              <div>
                <Label>Nama</Label>
                <Input name="nama" value={form.nama} onChange={handleChange} />
              </div>

              <div>
                <Label>Email</Label>
                <Input name="email" value={form.email} onChange={handleChange} />
              </div>

              <div>
                <Label>Phone</Label>
                <Input name="phone" value={form.phone} onChange={handleChange} />
              </div>

              <div>
                <Label>Bio</Label>
                <Input name="bio" value={form.bio} onChange={handleChange} />
              </div>

            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>

    </div>
  );
}
