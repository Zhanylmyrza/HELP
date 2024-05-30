import NoPhoto from "../NoPhoto/NoPhoto"
import '../../screens/Chat/Chat.css';

export const Contacts = ({users, onContactSelect}) => {
    const onUserClick = (user) => onContactSelect(user)
    
    return (
        <div className="col-sm-4 contacts" >
                    <div className="contact-table-scroll">
                        <table className="table table-hover">
                            <tbody >
                                {users.map((user, index) => (
                                    <tr key={index} class="divous wrap">

                                        <span class="contact-status online"></span>
                                        
                                        {user.image ? <img src={user.image} className="contacts-image" style={{ margin: '20px' }} />
                                            : <NoPhoto forContactPage={true} fullName={user.full_name} />}
                                        

                                        <div class="divous meta" style={{ paddingRight: '234px', marginTop: '10px', display:'flex', alignItems:'center' }} onClick={() => onUserClick(user)}>                                        
                                            {/* <td>
                                                <a style={{ color: user.is_online ? 'green' : 'red' }} onClick={() => onUserClick(user)}>
                                                     {user.full_name} 
                                                </a>
                                            </td> */}
                                            <p class="name" style={{ color: user.is_online ? 'green' : '#a4a2f1' , marginTop: '15px'}} > {user.full_name} </p>
                                            {/* <p class="preview">written the last messages... </p> */}
                                        </div>
                                        <hr />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
    )
}