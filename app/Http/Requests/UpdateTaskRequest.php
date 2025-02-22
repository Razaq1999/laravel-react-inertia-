<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'min:3', 'max:255'],
            'image' => ['nullable', 'image'],
            'description' => [ 'nullable' ,'string'],
            'status' => ['required', Rule::in(["pending", "in_progress", "completed"])],
            'assigned_user_id' => ['required', 'exists:users,id'],
            'project_id' => ['required', 'exists:projects,id'],
            "priority" => ['required', Rule::in(["low", "medium", "high"])],
            'due_date' => ['nullable' , 'date'],


        ];
    }
}
