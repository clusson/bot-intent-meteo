import test from 'ava'
import { logic } from '../src/logic'
test(t => {
    return logic({ message: { content: 'test' }, luis: {} }).then(response => {
        t.deepEqual('Je n\'ai pas réussi à trouver la météo', response.message.content)
    })

})

test(t => {
    return logic({ message: { content: 'test' }, luis: { entities: [{ type: 'city' }] } }).then(() => {
        t.pass()
    })

})