
exports.listContactService =(user_id , search ,page ,limit ,relation ,favourite)=>{
return `http://localhost:8080/contacts/${user_id}?search=${search}&page=${page}&limit=${limit}&relation=${relation}&favourite=${favourite}`
}

exports.deleteContactService =(contact_id)=>{
    return `http://localhost:8080/contacts/${contact_id}`
}


exports.updateContactService =(contact_id)=>{
    return `http://localhost:8080/contacts/${contact_id}`
}


exports.createContactService =(contact_id)=>{
    return `http://localhost:8080/contacts`
}