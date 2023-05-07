import $ from "jquery"

export function toggleClass(query: string, class1: string, class2: string) {
    if ($(query).hasClass(class1)) {
        $(query).removeClass(class1)
        $(query).addClass(class2)
    } else {
        $(query).removeClass(class2)
        $(query).addClass(class1)
    }
}