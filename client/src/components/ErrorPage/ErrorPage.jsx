import React from 'react'
import s from './ErrorPage.module.css'

function ErrorPage() {
    const backHandler = () => {
        document.location.href = '/HomePage'
    }
    return (
        <div className='mt-5 d-flex flex-column align-items-center justify-content-center'>
            <div className={s.image}>
            </div>
            <div className='mt-2 d-flex flex-column align-items-center'>
                <h3>
                    Что-то пошло не так...
                </h3>
                <button onClick={backHandler} type='button' className='btn btn-primary'>
                <i class="bi bi-arrow-left-circle"></i> Вернуться на главную
                </button>
            </div>
        </div>
    )
}

export default ErrorPage
