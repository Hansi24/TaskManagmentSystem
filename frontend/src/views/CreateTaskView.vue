<template>
    <div class="bg-gray-800 h-screen p-20">
        <div class="w-[500px] mx-auto">
            <div class="flex flex-col justify-start items-start">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input v-model="title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required>
            </div>
            <div class="flex flex-col justify-start items-start mt-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea v-model="description" type="text" rows="6" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required></textarea>
            </div>
            <div class="flex flex-col justify-start items-start mt-2">
                <label for="duedate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due date</label>
                <input type="date" v-model="duedate" id="duedate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required>
            </div>
            <div class="mt-4">
                <div @click="createTask" class="w-24 h-10 bg-gray-600 text-white flex items-center justify-center rounded hover:bg-gray-700 hover:cursor-pointer">
                    Create
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'createTask',
        data(){
            return {
                title: '',
                description: '',
                duedate: Date.now(),
            }
        },
        methods: {
            createTask(){
                var data = {
                    title: this.title,
                    description: this.description,
                    dueDate: this.duedate
                }
                axios.post('http://localhost:5000/tasks/createTask',data).then((res) => {
                    this.$router.push('/')
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>