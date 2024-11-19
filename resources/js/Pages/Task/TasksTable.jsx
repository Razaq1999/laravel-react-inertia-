import Pagination from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant.jsx";
import TableHeading from "@/Components/TableHeading";
import {  Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function TasksTable({ tasks ,success ,queryParams = null , hideProjectColumn = false }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;  
        } else {
            delete queryParams[name];
        }
        router.get(route("task.index"), queryParams);
    };

    const sortChanged = (name) => {
        if(name === queryParams.sort_field) {
            if(queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route("task.index"), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return; // exit if not "Enter"
        searchFieldChanged(name, e.target.value);
        // Trigger the search or make an Inertia request (you will need to implement this)
    };
    const deleteTask = (task) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }
            router.delete(route("task.destroy", task.id));
        };
    

    return (
        <>
        {success && (
            <div
                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
            >
                <span className="font-medium">Success</span> {success}
            </div>
        )}
         <div className="overflow-auto sm:rounded-lg">
                           <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400 rtl:text-right border border-gray-200 dark:border-gray-600 rounded-lg">
                                {/* Table Headers */}
                                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 uppercase">
                                    <tr className="text-nowrap border-b border-gray-200 dark:border-gray-600"	>
                                    <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <th className="px-3 py-3">Image</th>
                     {!hideProjectColumn && (<th className="px-3 py-3">
                        Project Name
                      </th>)}
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Status
                      </TableHeading>

                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>

                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Due Date
                      </TableHeading>
                      <th className="px-3 py-3">Created By</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>

                                {/* Filters */}
                                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
                                    <tr>
                                        <th className="py-3 px-3"></th>
                                        <th className="py-3 px-3"></th>
                                        {!hideProjectColumn && (<th className="py-3 px-3"></th>)}
                                        <th className="py-3 px-3">
                                            <TextInput
                                                defaultValue={queryParams.name}
                                                className="w-full"
                                                placeholder="Task Name"
                                                onBlur={(e) => searchFieldChanged("name", e.target.value)}
                                                onKeyPress={(e) => onKeyPress("name", e)}
                                            />
                                        </th>
                                        <th className="py-3 px-3">
                                            <SelectInput
                                                defaultValue={queryParams.status}
                                                className="w-full"
                                                onChange={(e) => searchFieldChanged("status", e.target.value)}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className="py-3 px-3"></th>
                                        <th className="py-3 px-3"></th>
                                        <th className="py-3 px-3"></th>
                                        <th className="py-3 px-3"></th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="bg-white dark:bg-gray-700 border-b dark:border-gray-600">
                                    {tasks.data.map((task) => (
                                        <tr
                                            className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={task.id}
                                        >
                                            <td className="py-3 px-3">{task.id}</td>
                                            <td className="py-3 px-3">
                                                <img
                                                    src={task.image_path}
                                                    style={{ width: 100, height: 100, borderRadius: 20 }}
                                                    alt="Task"
                                                />
                                            </td>
                                            {!hideProjectColumn && (<td className="py-3 px-3">{task.project.name}</td>)}
                                            <th className="py-3 px-3">
                                                <Link href={route('task.show', task.id)} 
                                                className="text-gray-100 hover:text-green-200 hover:underline">
                                                {task.name}
                                                </Link>
                                            </th>
                                            <td className="py-3 px-3">
                                                <span
                                                    className={"px-3 text-nowrap py-1 rounded-full text-white " + TASK_STATUS_CLASS_MAP[task.status]}
                                                >
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3">{task.created_at}</td>
                                            <td className="py-3 px-3 text-nowrap">{task.due_date}</td>
                                            <td className="py-3 px-3">{task.createdBy.name}</td>
                                            <td className="py-3 px-3 space-x-3 text-nowrap">
                                                <Link href={route('task.edit', task.id)} className="text-blue-500 hover:text-blue-700">
                                                    EDIT
                                                </Link>

                                                <button
                                                onClick={(e) => deleteTask(task)}
                                                
                                                 className="text-red-500 hover:text-red-700">
                                                    DELETE
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                           </div>
                            {/* Pagination */}
                            <Pagination links={tasks.meta.links} />
        </>
    )
}