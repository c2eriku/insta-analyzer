export class Profile {
    id: string = '';
    avatar: string = '';
    name: string = '';
    href: string = '';
    verified: boolean = false;


    constructor(avatar: string, id: string, name: string, href: string, verified: boolean) {
        this.avatar = avatar;
        this.id = id;
        this.name = name
        this.href = href;
        this.verified = verified;
    }

    isSame(pf: Profile): boolean {
        return this.id == pf.id ? true : false;
    }
}