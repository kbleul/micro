export const parsePhoneNumber = (phone: string) => {

    if(phone[0] == "0") {
        return phone.slice(1)
    }

    return phone.slice(3)
}