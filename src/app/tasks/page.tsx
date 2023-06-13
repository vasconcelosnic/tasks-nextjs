'use client';
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image";

export default function Home() {

    interface ITask {
        id: number,
        descricao: string,
        realizado: boolean,
        created: Date,
    }

    const [tasks, setTask] = useState<ITask[]>([])
    const [idEditTask, setIdEditaTask] = useState<Number>()
    const descRef = useRef<HTMLInputElement>(null)
    const descEditRef = useRef<HTMLInputElement>(null)
   

   
    async function clickDelete(id: number) {
        const data = await fetch(process.env.API_URL_BACK + '/tasks/${id}', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        getListTasks()
    }

    async function clickCreate(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        const target = descRef.current as HTMLInputElement;

        const data = await fetch(process.env.API_URL_BACK + '/tasks/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                descricao: target.value,
            })
        })
        getListTasks()
    }

    async function clickRealizado(id: number) {
        const data = await fetch(process.env.API_URL_BACK + '/tasks/${id}', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                realizado: true,
            })
        })
        getListTasks()
    }

    async function clickNaoRealizado(id: number) {
        const data = await fetch(process.env.API_URL_BACK + '/tasks/${id}', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                realizado: false,
            })
        })
        getListTasks()
    }
    async function clickFormEditaActive(id: number) {
        setIdEditaTask(id)
        getListTasks()
    }

    async function clickCancelUpdate() {
        setIdEditaTask(0)
        getListTasks()
    }

    async function clickUpdate(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        const target = descEditRef.current as HTMLInputElement;
        const id = idEditTask;

        const data = await fetch(process.env.API_URL_BACK + '/tasks/${id}', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                descricao: target.value,
            })
        })
        setIdEditaTask(0);
        getListTasks()
    }

    const getListTasks = async () => {
        const data = await fetch(process.env.API_URL_BACK + '/tasks/listar')
        const dataJson = await data.json()
        setTask(dataJson.tasks)
    }

    useEffect(() => {
        getListTasks()
    }, [])

  return (
    <div>
        <div className="mx-auto flex  w-2/3 my-3 py-2">
            <form className="w-full" id='my-form'>
                <div className="grid grid-cols-7">
                    <div className=" w-full col-span-6">
                        <input type="text" ref={descRef} name="descricao" id="descricao" className="w-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-green-900 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green sky-500 focus:ring-green-500 focus:ring-1 sm:text-sm" placeholder="Digite Nova tarefa" />{""}
                    </div>
                    <div className="w-full text-right">
                        <button type='button' onClick={clickCreate} className="px-4 py-2 font-semibold text-sm bg-green-900 text-white rounded-full shadow-sm mx-2">Salvar</button>
                    </div>
                </div>
            </form>
        </div>

        <div className="mx-auto flex  w-full my-3 py-2 px-5">
            <div className="w-full grid grid-cols-2">
                <div className="w-full ">
                    <h2 className="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-pink-800">PENDENTES</span></h2>
                    <div className="p-3 relative overflow-x-auto">
                        <table className="w-full table-auto border-collapse rounded">
                            <thead className="w-full text-sm text-left">
                                <tr className="bg-slate-300">
                                    <th scope="col" className="px-6 py-3">Descrição</th>
                                    <th scope="col" className="text-center px-6 py-3">Dt. Criação</th>
                                    <th scope="col" className="text-center px-6 py-3">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="in-w-full text-left text-sm font-light border-2 border rounded">
                                { 
                                    tasks.map((task)=>{
                                        const idTask = task.id;
                                        const desc = task.descricao;
                                        const dtCreate = new Date(task.created);
                                        const dtCreateFormat = dtCreate.getDate() + '/' + ("0" + (dtCreate.getMonth()+1)).slice(-2)  + '/' + dtCreate.getFullYear();
                                        
                                        if(task.realizado == false)
                                        {
                                            if(idEditTask != idTask){

                                                return (
                                                    <tr key={idTask} className="border-b border-salte-300">
                                                        <td className="px-1 py-2">{desc}</td>
                                                        <td className="text-center w-1/3 px-1 py-2">{dtCreateFormat}</td>
                                                        <td className="text-center w-1/3 px-1 py-2">
                                                            <button id="editButton" className="bg-green-900 hover:bg-green-600 text-white font-bold py-1 px-4 rounded mx-2" onClick={() => { clickRealizado(idTask) }}>
                                                            <Image
                                                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                                src="/img/realizar.svg"
                                                                alt="Realizado"
                                                                width={20}
                                                                height={0}
                                                                priority
                                                                />
                                                            </button>
                                                            <button id="editButton" className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded mx-2" onClick={() => { clickFormEditaActive(idTask) }}>
                                                                
                                                            <Image
                                                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                                src="/img/editar.svg"
                                                                alt="Editar tarefa"
                                                                width={20}
                                                                height={0}
                                                                priority
                                                                />

                                                            </button>
                                                            <button id="deleteButton" className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mx-2" onClick={() => { clickDelete(idTask) }}>
                                                                <Image
                                                                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                                    src="/img/excluir.svg"
                                                                    alt="Excluir a tarefas"
                                                                    width={20}
                                                                    height={0}
                                                                    priority
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }else{
                                                return (
                                                        <tr key={idTask} className="border-b border-salte-300">
                                                            <td className="px-1 py-2" colSpan={3}>
                                                                <form className="w-full" id='my-formEdit'>
                                                                    <div className="grid grid-cols-7">
                                                                        <div className=" w-full col-span-5">
                                                                            <input type="text" ref={descEditRef} className="w-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-green-900 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green sky-500 focus:ring-green-500 focus:ring-1 sm:text-sm" defaultValue={desc} placeholder="Digite Nova tarefa" />
                                                                        </div>
                                                                        <div className="w-full text-right">
                                                                        <button type='button' onClick={clickUpdate} className="bg-green-900 hover:bg-green-600 text-white font-bold py-1 px-4 rounded mx-2">Salvar</button>
                                                                    </div>
                                                                    <div className="w-full text-right">
                                                                        <button type='button' onClick={clickCancelUpdate} className="bg-slate-900 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded mx-2">Cancelar</button>
                                                                    </div>
                                                                    </div>
                                                                </form>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        }
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="w-full ">
                    <h2 className="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-pink-800">REALIZADO</span></h2>
                    <div className="p-3 relative overflow-x-auto">
                        <table className="w-full table-auto border-collapse rounded">
                            <thead className="w-full text-sm text-left">
                                <tr className="bg-slate-300">
                                    <th scope="col" className="px-6 py-3">Descrição</th>
                                    <th scope="col" className="text-center px-6 py-3">Dt. Criação</th>
                                    <th scope="col" className="text-center px-6 py-3">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="in-w-full text-left text-sm font-light border-2 border rounded">
                                { 
                                    tasks.map((task)=>{
                                        const idTask = task.id;
                                        const desc = task.descricao;
                                        const dtCreate = new Date(task.created);
                                        const dtCreateFormat = dtCreate.getDate() + '/' + dtCreate.getMonth()  + '/' + dtCreate.getFullYear;

                                        if(task.realizado == true)
                                        {
                                            if(idEditTask != idTask){

                                                return (
                                                    <tr key={idTask} className="border-b border-salte-300">
                                                        <td className="px-1 py-2">{desc}</td>
                                                        <td className="text-center w-1/3 px-1 py-2">{dtCreateFormat}</td>
                                                        <td className="text-center w-1/3 px-1 py-2">
                                                            <button id="editButton" className="bg-yellow-900 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded mx-2" onClick={() => { clickNaoRealizado(idTask) }}>
                                                            <Image
                                                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                                src="/img/desfazer.svg"
                                                                alt="Realizado"
                                                                width={20}
                                                                height={0}
                                                                priority
                                                                />
                                                            </button>
                                                            <button id="editButton" className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded mx-2" onClick={() => { clickFormEditaActive(idTask) }}>
                                                                
                                                            <Image
                                                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                                src="/img/editar.svg"
                                                                alt="Editar tarefa"
                                                                width={20}
                                                                height={0}
                                                                priority
                                                                />

                                                            </button>
                                                            <button id="deleteButton" className="bg-red-800 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mx-2" onClick={() => { clickDelete(idTask) }}>
                                                                <Image
                                                                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                                                    src="/img/excluir.svg"
                                                                    alt="Excluir a tarefas"
                                                                    width={20}
                                                                    height={0}
                                                                    priority
                                                                />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }else{
                                                return (
                                                        <tr key={idTask} className="border-b border-salte-300">
                                                            <td className="px-1 py-2" colSpan={3}>
                                                                <form className="w-full" id='my-formEdit'>
                                                                    <div className="grid grid-cols-7">
                                                                        <div className=" w-full col-span-5">
                                                                            <input type="text" ref={descEditRef} className="w-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-green-900 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-green sky-500 focus:ring-green-500 focus:ring-1 sm:text-sm" defaultValue={desc} placeholder="Digite Nova tarefa" />
                                                                        </div>
                                                                        <div className="w-full text-right">
                                                                        <button type='button' onClick={clickUpdate} className="bg-green-900 hover:bg-green-600 text-white font-bold py-1 px-4 rounded mx-2">Salvar</button>
                                                                    </div>
                                                                    <div className="w-full text-right">
                                                                        <button type='button' onClick={clickCancelUpdate} className="bg-slate-900 hover:bg-slate-600 text-white font-bold py-1 px-4 rounded mx-2">Cancelar</button>
                                                                    </div>
                                                                    </div>
                                                                </form>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        }
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
