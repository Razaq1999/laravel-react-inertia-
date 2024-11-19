import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, user , tasks , queryParams , success }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-2xl text-gray-200 leading-tight">{user.name}</h2>}
        >
            <Head title={user.name} />
            
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* User Image */}
                    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-md sm:rounded-lg mb-8">
                        <div className="p-6">
                            <img
                                src={user.image_path}
                                className="w-full h-64 sm:h-80 object-cover rounded-md"
                                alt="User"
                            />
                        </div>
                    </div>
                    
                    {/* User Details */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                {/* Left Column */}
                                <div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">User ID</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{user.id}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">User Name</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{user.name}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">User Status</label>
                                        <p className="mt-1">
                                            <span
                                                className={`px-3 py-1 rounded-full text-white ${USER_STATUS_CLASS_MAP[user.status]}`}
                                            >
                                                {USER_STATUS_TEXT_MAP[user.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">User Description</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{user.description}</p>
                                    </div>
                                </div>
                                
                                {/* Right Column */}
                                <div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">User Created By</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{user.createdBy.name}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">User Created At</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{new Date(user.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">User Due Date</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{new Date(user.due_date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
            
              <TasksTable
                tasks={tasks}
                success={success}
                queryParams={queryParams}
                hideUserColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
        </AuthenticatedLayout>
    );
}
