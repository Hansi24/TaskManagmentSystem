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
            
            <div class="flex flex-col justify-start items-start mt-2">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <select id="countries" v-model="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="pending" :selected="status == 'pending'">pending</option>
                    <option value="in-progress" :selected="status == 'in-progress'">in-progress</option>
                    <option value="completed" :selected="status == 'completed'">completed</option>
                </select>
            </div>

            <div class="mt-4">
                <div @click="editTask" class="w-24 h-10 bg-gray-600 text-white flex items-center justify-center rounded hover:bg-gray-700 hover:cursor-pointer">
                    Update
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'editTask',
        props: {
            id: {
                type: String
            }
        },
        data(){
            return {
                title: '',
                description: '',
                duedate: '',
                status: ''
            }
        },
        methods: {
            fetchTask(){
                axios.get(`http://localhost:5000/tasks/task/${this.id}`).then((res) => {
                    this.title = res.data.task.title
                    this.description = res.data.task.description
                    const dueDate = new Date(res.data.task.dueDate);
                    this.status = res.data.task.status
                    this.duedate = dueDate.toISOString().split('T')[0];
                }).catch((err) => {
                    console.log(err)
                })
            },
            editTask(){
                var data = {
                    title: this.title,
                    description: this.description,
                    dueDate: this.duedate,
                    status: this.status
                }
                axios.patch(`http://localhost:5000/tasks/editTask/${this.id}`,data).then((res) => {
                    this.$router.push('/')
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        mounted(){
            this.fetchTask()
        }
    }
</script>