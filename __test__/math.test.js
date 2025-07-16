import {add,multi} from "../math.js"



test("testing add function",()=>{
    expect(add(10,20)).toBe(30);
    expect(add(5,0)).toBe(5),
    expect(add()).toBe(NaN);
})



test("testing multi function",()=>{
    expect(multi(10,20)).toBe(200);
    expect(multi(5,0)).toBe(0),
    expect(multi()).toBe(NaN);
})