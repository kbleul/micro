export const parsePhoneNumber = (phone: string) => {

    console.log(phone[0])
    if(phone[0] == "0") {
        return phone.slice(1)
    }

    return phone.slice(3)
}