export const numberUnit = (number) => {
        let K = 1000
        let M = 1000000
        let B = 1000000000
        let T = 1000000000000
        let unit = ''
        let count = 0
        if (Math.trunc(number / T) > 0) {
                count = parseInt(number / T)
                unit = 'T'
        } else if (Math.trunc(number / B) > 0) {
                count = parseInt(number / B)
                unit = 'B'
        } else if (Math.trunc(number / M) > 0) {
                count = parseInt(number / M)
                unit = 'M'
        } else if (Math.trunc(number / K) > 0) {
                count = parseInt(number / K)
                unit = 'K'
        } else {
                count = parseInt(number)
        }
        return [count, unit]
}
