import { Sidebar, sidebarClasses } from 'react-pro-sidebar';

const EditTask = () => {
    return (
        <div
            style={{
                display: 'flex',
                height: '100%',
                minHeight: '400px',
                direction: 'rtl',
            }}
        >
            <Sidebar width="500px" rtl rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'white'
                },
            }}>

            </Sidebar>
        </div>
    )
}

export default EditTask;