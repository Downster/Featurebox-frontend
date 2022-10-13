import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { tokenFetch } from "@/utils/tokenFetch";
import { TextField } from "./Fields";

const schema = yup.object({
    name: yup.string()
        .required()
        .min(3, "Name must be a minimum of 3 characters")
        .max(20, "Name can be at most 20 characters"),
    description: yup.string()
        .required()
        .min(3, "Description must be at least 3 characters")
        .max(400, "Description must be less than 400 characters"),
    message: yup.string()
        .required()
        .min(3, "Message must be at least 3 characters")
        .max(400, "Message must be less than 400 characters"),
    file: yup.mixed().required("You must upload a file")
})

export default function ImageUploadForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('owner', 'poppy')
        formData.append('message', data.message);
        formData.append('file', data.file[0])
        const res = await tokenFetch('/api/images', {
            method: "POST",
            body: formData
        }
        )
        const info = await res.json()
        console.log(info)
    }
    return (
        <>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                                    http://
                                                </span>
                                                <input
                                                    type="text"
                                                    {...register("name")}
                                                    name="name"
                                                    id="name"
                                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="www.example.com"
                                                />
                                                <p>{errors.name?.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Descripton
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                {...register("description")}
                                                id="description"
                                                name="description"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="you@example.com"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description of the picture. URLs are hyperlinked.
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Message
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                {...register("message")}
                                                id="message"
                                                name="message"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Woah, this is cool!"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Message to be encoded in the picture.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            {...register("file")}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}