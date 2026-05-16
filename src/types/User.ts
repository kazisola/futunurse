export interface IUser {
    email: string,
    fullName: string,
    program_type?: "ADN" | "BSN" | "LPN" | "ABSN",
    expected_graduation?: string,
    school?: string
}