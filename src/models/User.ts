export type userProfileToken = {
    // id: number
    firstName: string
    lastName: string
    email: string
    imageUrl?: string
    langKey?: string
    mobileNumber?: string
    dateOfBirth?: string
    roleUuid?: string
    roles?: string
    departmentUuid?: string
    token: string
}

export type userProfile = {
    email: string
    roles?: string | string[]
    firstName?: string
    lastName?: string 
    imageUrl?: string
}



