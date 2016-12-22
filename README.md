# RxjsPlayground

This playground can be used to experiment with RxJS. Simply write RxJS code in the editor, and it will run automatically.

## Features
* TypeScript support - The TypeScript compiler is invoked on all content, so you can write in `.js` or `.ts`
* console.log has been redirected so that you can log to the output panel by using console.log

### Example
The following will output `1 2 3` to the output panel.
```typescript
let subject = new Rx.Subject<number>();

subject.subscribe(res => {
    console.log(res));
}

[1, 2, 3].forEach(i => {
    subject.next(i);
});

// 1
// 2
// 3
```