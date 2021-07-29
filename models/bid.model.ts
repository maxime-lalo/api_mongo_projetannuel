
export interface IBidProps {
    id: number;
    creator: string;
    active: boolean;
}

export class Bid implements IBidProps {
    id: number;
    creator: string;
    active: boolean;

    constructor(props: IBidProps) {
        this.id = props.id;
        this.creator = props.creator;
        this.active = props.active;
    }
}