import { apiCallBegan } from "../api"
import { addBug, bugAdded } from "../bugSlice"
import configureStore from "../configureStore"
import MockAdapter from 'axios-mock-adapter'
import axios from "axios"

// describe('bugSlice', () => {
//     describe('action creators', () => {
//         it('addBug', () => {
//             const bug = {description: 'Simple'}
//             const result = addBug(bug)
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: 'post',
//                     data: bug,
//                     onSuccess: bugAdded.type
//                 }
//             }
//             expect(result).toEqual(expected);
//         })
//     })
// })

// describe('bugSlice', () => {
//     it('should handle the bug action', async () => {
//         //dispatch(addbug) => store
//         const bug = {description: 'Simple'}
//         const store = configureStore();
//         await store.dispatch(addBug(bug))
//         console.log(store.getState())
//         expect(store.getState().entities.bugs.bugs).toHaveLength(1)
//     });
// });

describe('bugSlice', () => {
    let fakeAxios;
    let store;

    beforeEach(()=>{
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    it('should add the bug to store if its saved to the server', async () => {
        // AAA approach
        // Arrange  : all the initializatiomn
        const bug = {description: 'Simple'}
        const savedBug = {...bug, id: 1}
        fakeAxios.onPost('/bugs').reply(200, savedBug);

        // Act      : trigger an action
        await store.dispatch(addBug(bug))

        // Assert   : expectation code
        expect(bugsSlice().bugs).toContainEqual(savedBug)
    });

    it('should not add the bug to store if its not saved to the server', async () => {
        // AAA approach
        // Arrange  : all the initializatiomn
        const bug = {description: 'Simple'}
        fakeAxios.onPost('/bugs').reply(500);

        // Act      : trigger an action
        await store.dispatch(addBug(bug))

        // Assert   : expectation code
        expect(bugsSlice().bugs).toHaveLength(0)
    });
});