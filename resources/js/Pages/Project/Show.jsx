import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, project , tasks , queryParams , success }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={ <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-gray-200 leading-tight">{project.name}</h2>
            
            <Link href={route('project.edit', project.id)} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Edit</Link>
            </div>
        }
        >
            <Head title={project.name} />
            
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Project Image */}
                    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-md sm:rounded-lg mb-8">
                        <div className="p-6">
                            <img
                                src={project.image_path}
                                className="w-full h-64 sm:h-80 object-cover rounded-md"
                                alt="Project"
                            />
                        </div>
                    </div>
                    
                    {/* Project Details */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                {/* Left Column */}
                                <div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">Project ID</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{project.id}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">Project Name</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{project.name}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">Project Status</label>
                                        <p className="mt-1">
                                            <span
                                                className={`px-3 py-1 rounded-full text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                                            >
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">Project Description</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{project.description}</p>
                                    </div>
                                </div>
                                
                                {/* Right Column */}
                                <div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">Project Created By</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{project.createdBy.name}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">Project Created At</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{new Date(project.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="font-bold text-lg text-gray-700 dark:text-gray-300">Project Due Date</label>
                                        <p className="mt-1 text-gray-600 dark:text-gray-400">{new Date(project.due_date).toLocaleDateString()}</p>
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
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
        </AuthenticatedLayout>
    );
}
