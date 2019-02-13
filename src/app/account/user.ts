
export class User {

    private _email: string;
    private _fullname: string;
    private _name: string;
    private _firstname: string;
    private _imageURL: string;

    constructor(email?: string, fullname?: string, name?: string, firstname?: string, image?: string) {
        this._email = email || null;
        this._fullname = fullname || null;
        this._name = name || null;
        this._firstname = firstname || null;
        this._imageURL = image || null;
    }

    get imageUrl(): string {
        return this._imageURL;
    }

    set image(value: string) {
        this._imageURL = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get fullname(): string {
        return this._fullname;
    }

    set fullname(value: string) {
        this._fullname = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get firstname(): string {
        return this._firstname;
    }

    set firstname(value: string) {
        this._firstname = value;
    }

}
