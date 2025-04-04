import Image from "next/image";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";

// import {getUser} from '@/auth'
// import cookies from 'next/headers'

export default function AdminDashboard() {
  // const user = getUser(await cookies())
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("logout failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-center mt-1">Profile</h1>

      {/* Profile card and dashboard container */}
      <div className="flex flex-row w-full">
        {/* Profile card (takes 30% width) */}
        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={"/default-avatar.jpg"}
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <h2 className="text-xl font-bold mb-4">Hello Admin</h2>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard (takes 70% width) */}
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p className="text-gray-600">
              Welcome to your dashboard! Here you can manage your resources and
              account settings.
            </p>
            {/* More dashboard content here */}
            <h1> New Submission</h1>
            <div className="flex flex-row space-x-6">
              <div className="flex flex-row items-center">
                <h3 className="text-xl font-semibold">New Submissions</h3>
                {/* Add content here for reviews */}
              </div>

              <div className="flex flex-row items-center">
                <h3 className="text-xl font-semibold">Rejected</h3>
                {/* Add content here for likes */}
              </div>

              <div className="flex flex-row items-center">
                <h3 className="text-xl font-semibold">Approved</h3>
                {/* Add content here for submissions */}
              </div>
            </div>
            <h1> Edit Submission</h1>
            <div className="flex flex-row space-x-6">
              <div className="flex flex-row items-center">
                <h3 className="text-xl font-semibold">Edit Submissions</h3>
                {/* Add content here for reviews */}
              </div>

              <div className="flex flex-row items-center">
                <h3 className="text-xl font-semibold">Rejected</h3>
                {/* Add content here for likes */}
              </div>

              <div className="flex flex-row items-center">
                <h3 className="text-xl font-semibold">Approved</h3>
                {/* Add content here for submissions */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
