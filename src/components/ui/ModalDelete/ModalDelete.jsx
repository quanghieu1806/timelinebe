import React from 'react'

const ModalDelete = ({ title, showModal, deleteUser }) => {
    return (
        <div className="modal-delete d-flex">
            <div className="pop-up-delete">
                <div className="title">{title}</div>
                <div className="yes-no d-flex">
                    <div className="yes-no-wrapper">
                        <div className="no" onClick={() => showModal(false)}>
                            Hủy bỏ
                        </div>
                        <div className="yes">
                            <button type="button" class="btn btn-primary" onClick={() => {
                                deleteUser()
                                showModal(false)
                            }}>Đồng ý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete