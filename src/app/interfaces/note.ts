export interface Note {
    id? : number,
    title : string,
    content : string,
    userUid_fk : string,
    createdAt? : string,
    updatedAt? : string
}
