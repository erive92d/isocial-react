import moment from "moment";

export default function momentFormat(date) {
    return moment(date).fromNow()
}