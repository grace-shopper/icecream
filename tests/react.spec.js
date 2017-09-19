import React from 'react';
import { createStore } from 'redux';

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import {Login} from '../app/components/Login.jsx';
import SearchedProducts from '../app/components/SearchedProducts.js';
import {OrderHistory} from '../app/components/OrderHistory.jsx';

import rootReducer from '../app/reducers';
import actualStore from '../app/store';


describe('<Login>', function () {
  it('should have multiple inputs', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should have a button', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

});

describe('<SearchedProducts>', function () {
  const products = [
    {
      title: 'product 1',
      description: 'product 1',
      inventory: 10,
      price: 1.00
    },
    {
      title: 'product 2',
      description: 'product 2',
      inventory: 20,
      price: 2.00
    }
  ]
  it('should have a card for each product', function () {
    const wrapper = shallow(<SearchedProducts filteredProducts={products}/>);
    expect(wrapper.find('Card')).to.have.length(2);
  });

});

describe('<OrderHistory>', function () {
  const orders = [
    {
      createdAt: Date.now(),
      id: 1,
      products: [{
        price: 2.50,
        title: 'product 2',
        description: 'enjoy',
        inventory: 10,
        id: 1,
        order_products: [
          {
            createdAt: Date.now(),
            originalPrice: 2.50,
            productId: 1,
            quantity: 1,
            updatedAt: Date.now()
          }
        ]
      }],
      status: 'completed',
      userId: 1
    },
    {
      title: 'product 2',
      description: 'product 2',
      inventory: 20,
      price: 2.00
    }
  ]
  // it('should have a row for each purchase', function () {
  //   const wrapper = shallow(<OrderHistory orders={orders} purchases={orders.products}/>);
  //   expect(wrapper.find('TableRowColumn')).to.have.length(6);
  // });

});


//   describe('interactivity', () => {

//     // Now we build a `Message` component with multiple props. Most
//     // notably, we are passing a *spy* function into the `markAsRead`
//     // prop. Spies let us test how a function ends up being used.

//     let messageData, messageWrapper, markAsReadSpy;
//     beforeEach('Create <Message />', () => {
//       messageData = testUtilities.createOneRandomMessage();
//       // http://sinonjs.org/docs/#spies
//       markAsReadSpy = spy();
//       messageWrapper = shallow(<Message fullMessage={messageData} markAsRead={markAsReadSpy} />);
//     });

//     // Read both the description and `expect`s carefully. You should know
//     // how to attach a click handler which calls a function with specific
//     // arguments.

//     it('when clicked, invokes a function passed in as the markAsRead property with the message id', () => {

//       // The function passed into `markAsRead` should not be called immediately.
//       expect(markAsReadSpy).not.to.have.been.called; // eslint-disable-line

//       // This will trigger any onClick handlers registered to the component.
//       messageWrapper.simulate('click');

//       // When the component is clicked, we want the function passed into
//       // `markAsRead` to be invoked.
//       expect(markAsReadSpy).to.have.been.called; // eslint-disable-line

//       // Not only invoked, but invoked with the right arguments. Don't get
//       // too stubborn – move on if you are having problems.
//       expect(markAsReadSpy).to.have.been.calledWith(messageData.id);

//     });

//   });

// });

// describe('Inbox', () => {

//   let randomMessages;
//   beforeEach('Create random example messages', () => {
//     randomMessages = testUtilities.createRandomMessages(10)
//   });

//   // Once again, we are making a testable React component. This time,
//   // it's our `Inbox` component.

//   let inboxWrapper;
//   beforeEach('Create <Inbox />', () => {
//     inboxWrapper = shallow(<Inbox />, { context: { store: actualStore } });
//     // we're simulating the component mounting by simply calling the `componentDidMountMethod` for this component (if you've defined one)
//     if (inboxWrapper.instance().componentDidMount) {
//       inboxWrapper.instance().componentDidMount();
//     }
//   });

//   // How (or where) do you define the initial state of a React component?

//   it('starts with an initial state having an empty messages array', () => {
//     const currentState = inboxWrapper.state();
//     expect(currentState.messages).to.be.deep.equal([]);
//   });

//   describe('visual content', () => {

//     // Don't worry about `markAsRead` — that doesn't apply to this suite!

//     it('is comprised of <Message /> components (NOTE: no need for a `markAsRead` prop) based on what gets placed on the state', () => {

//       // This will alter the component's *local state* (i.e. `this.state`).
//       inboxWrapper.setState({ messages: randomMessages });
//       // There should now be a bunch of Message components in the output.
//       expect(inboxWrapper.find(Message)).to.have.length(10);

//       // The first message displayed in the inbox should be based off of the
//       // first element in the randomMessages array.
//       const firstMessage = inboxWrapper.find(Message).at(0);
//       expect(firstMessage.equals(<Message fullMessage={randomMessages[0]} />)).to.be.true; // eslint-disable-line

//       // This will set the component's local state.
//       inboxWrapper.setState({ messages: randomMessages.slice(4) });
//       expect(inboxWrapper.find(Message)).to.have.length(6);

//     });

//   });

// });

// describe('NewMessageForm', () => {

//   let sendSpy;
//   beforeEach('Create spy function to pass in', () => {
//     sendSpy = spy();
//   });

//   let newMessageFormWrapper;
//   beforeEach('Create <NewMessageForm /> wrapper', () => {
//     // notice: we are making a NewMessageForm with an `onSend` prop,
//     // set to a function.
//     newMessageFormWrapper = shallow(<NewMessageForm onSend={sendSpy} />);
//   });

//   it('sets local state when inputs change', () => {

//     expect(newMessageFormWrapper.state()).to.be.deep.equal({
//       recipient: '',
//       subject: '',
//       body: ''
//     });

//     // Remember forms? We have some elements which are changing. How do you:
//     // 1) detect and react to a change in a form element?
//     // 2) get the value of the resulting event?
//     // 3) update the component's state appropriately?

//     // Test spec is finding a specific form field
//     const recipientInput = newMessageFormWrapper.find('#recipient-field');
//     // Now we cause a change, with some new data
//     recipientInput.simulate('change', { target: { value: 'joe@fullstackacademy.com', name: 'recipient' } });
//     // The component should have updated its state accordingly
//     expect(newMessageFormWrapper.state().recipient).to.be.equal('joe@fullstackacademy.com');

//     const subjectInput = newMessageFormWrapper.find('#subject-field');
//     subjectInput.simulate('change', { target: { value: 'Hello?', name: 'subject' } });
//     expect(newMessageFormWrapper.state().subject).to.be.equal('Hello?');

//     const bodyInput = newMessageFormWrapper.find('#body-field');
//     bodyInput.simulate('change', { target: { value: `Is it me you're looking for?`, name: 'body' } });
//     expect(newMessageFormWrapper.state().body).to.be.equal(`Is it me you're looking for?`);

//   });

//   // This next spec is going to cause the form to "submit". When that
//   // happens, the component should 1) invke the `onSend` prop, and 2)
//   // pass in the component's current state.

//   it('invokes passed in `onSend` function with local state when form is submitted', () => {

//     const formInfo = {
//       recipient: 'omri@gracehopperacademy.com',
//       subject: 'Hi Omri!',
//       body: 'Hello.'
//     };

//     newMessageFormWrapper.setState(formInfo);

//     // This will trigger any onSubmit handlers registered to the component.
//     newMessageFormWrapper.simulate('submit', { preventDefault: () => { } });

//     expect(sendSpy).to.have.been.called; // eslint-disable-line
//     expect(sendSpy).to.have.been.calledWith(formInfo);

//   });

// });

// describe('Redux architecture', () => {

//   describe('action creators', () => {

//     // Action creators are functions which return action objects.

//     describe('createMessagesReceivedAction', () => {

//       it('returns expected action description', () => {

//         const messages = testUtilities.createRandomMessages(5);

//         // Here we call the `createMessagesReceivedAction` action
//         // with some messages.
//         const actionDescriptor = createMessagesReceivedAction(messages);

//         // The action creator should have returned an action object
//         // just like this object literal:
//         expect(actionDescriptor).to.be.deep.equal({
//           type: MESSAGES_RECEIVED,
//           messages: messages
//         });

//       });

//     });

//     describe('createLoadingAction', () => {

//       it('returns expected action description', () => {

//         const actionDescriptor = createLoadingAction();

//         expect(actionDescriptor).to.be.deep.equal({
//           type: MESSAGES_LOADING
//         });

//       });

//     });

//     describe('createNewMessageAction', () => {

//       it('returns expected action description', () => {

//         const message = testUtilities.createOneRandomMessage();

//         const actionDescriptor = createNewMessageAction(message);

//         expect(actionDescriptor).to.be.deep.equal({
//           type: NEW_MESSAGE,
//           message: message
//         });

//       });

//     });

//   });

//   // Remember, reducers receive old state and an action object, and
//   // return a new state.

//   describe('store/reducer', () => {

//     let testingStore;
//     beforeEach('Create testing store from reducer', () => {
//       testingStore = createStore(rootReducer);
//     });

//     it('has an initial state as described', () => {
//       const currentStoreState = testingStore.getState();
//       // Our initial state has two properties as shown.
//       expect(currentStoreState.messagesLoading).to.be.equal(false);
//       expect(currentStoreState.messages).to.be.deep.equal([]);
//     });

//     // "on MESSAGES_LOADING" means when an action of that type is dispatched.

//     describe('reducing on MESSAGES_LOADING', () => {

//       it('affects state by setting messagesLoading to true and messages to empty array', () => {

//         // an action is dispatched…
//         testingStore.dispatch({
//           type: MESSAGES_LOADING
//         });

//         const newState = testingStore.getState();

//         // and lo, the state has changed! The reducer function is
//         // responsible for generating the new state.
//         expect(newState.messagesLoading).to.be.true; // eslint-disable-line
//         expect(newState.messages).to.be.deep.equal([]);

//       });

//       it('creates a NEW state object on any dispatched action', () => {

//         const currentStoreState = testingStore.getState();

//         testingStore.dispatch({
//           type: MESSAGES_LOADING
//         });

//         const subsequentStoreState = testingStore.getState();

//         // Remember how to copy properties into new objects?
//         // You should not be modifying a previous Redux state!

//         expect(currentStoreState).to.not.be.equal(subsequentStoreState);

//       });

//     });

//     describe('reducing on MESSAGES_RECEIVED', () => {

//       beforeEach('initialize the store to be loading messages', () => {
//         testingStore.replaceReducer(() => ({ ...testingStore.getState(), messagesLoading: false }));
//         testingStore.dispatch({ type: 'INITIALIZE_FOR_MESSAGES_RECEIVED_TEST' });
//         testingStore.replaceReducer(rootReducer);
//       });

//       it('affects the state by setting messagesLoading to false and messages to dispatched messages', () => {

//         const randomMessages = testUtilities.createRandomMessages(10);

//         testingStore.dispatch({
//           type: MESSAGES_RECEIVED,
//           messages: randomMessages
//         });

//         const newState = testingStore.getState();

//         expect(newState.messagesLoading).to.be.false; // eslint-disable-line
//         expect(newState.messages).to.be.deep.equal(randomMessages);

//       });

//     });

//     describe('reducing on NEW_MESSAGE', () => {

//       let existingRandomMessages;
//       beforeEach(() => {
//         existingRandomMessages = testUtilities.createRandomMessages(5);
//         testingStore = createStore(
//           rootReducer,
//           // this just sets the initial state of our store.
//           { messagesLoading: false, messages: existingRandomMessages }
//         );
//       });

//       it('affects the state by appends dispatched message to state messages', () => {

//         const dispatchedMessage = testUtilities.createOneRandomMessage();

//         testingStore.dispatch({
//           type: NEW_MESSAGE,
//           message: dispatchedMessage
//         });

//         const newState = testingStore.getState();
//         const lastMessageOnState = last(newState.messages);

//         // the NEW_MESSAGE action, when reduced, results in a
//         // message being added to the redux state's `messages` arr.
//         expect(newState.messages).to.have.length(6);
//         expect(lastMessageOnState).to.be.deep.equal(dispatchedMessage);

//       });

//       it('sets messages to different array from previous state', () => {

//         const originalState = testingStore.getState();
//         const dispatchedMessage = testUtilities.createOneRandomMessage();

//         testingStore.dispatch({
//           type: NEW_MESSAGE,
//           message: dispatchedMessage
//         });

//         const newState = testingStore.getState();

//         // Once again, don't mutate old data! Generate new data
//         // that looks the way you want. There are many ways to do
//         // so with arrays.
//         expect(newState.messages).to.not.be.equal(originalState.messages);
//         expect(originalState.messages).to.have.length(5);

//       });

//     });

//   });

//   describe('EXTRA CREDIT', () => {

//     describe('component connection', () => {

//       /*  --- EXTRA CREDIT ---
//        *   The assertions in this describe block assume ALL OTHERS have passed.
//        *   Please only move on to this portion once all specs are passing.
//        */

//       describe('<Inbox />', () => {

//         let inboxWrapper;
//         beforeEach('Get an <Inbox />', () => {
//           inboxWrapper = shallow(<Inbox />, { context: { store: actualStore } });
//           // we're simulating the component mounting by simply calling the `componentDidMountMethod` for this component (if you've defined one)
//           if (inboxWrapper.instance().componentDidMount) {
//             inboxWrapper.instance().componentDidMount();
//           }
//         });

//         // Where / how do you initialize local state? How do yuo
//         // get store state?

//         it('has an initial local state that reflects the current store state', () => {
//           const componentState = inboxWrapper.state();
//           expect(componentState.messagesLoading).to.be.false; // eslint-disable-line
//           expect(componentState.messages).to.be.deep.equal([]);
//         });

//         it('is subscribed to changes from the redux store and always reflects state accurately', () => {

//           actualStore.dispatch(createLoadingAction());

//           let currentComponentState = inboxWrapper.state();

//           expect(currentComponentState.messagesLoading).to.be.true; // eslint-disable-line
//           expect(currentComponentState.messages).to.be.deep.equal([]);

//           const randomMessages = testUtilities.createRandomMessages(10);
//           actualStore.dispatch(createMessagesReceivedAction(randomMessages));

//           currentComponentState = inboxWrapper.state();

//           expect(currentComponentState.messagesLoading).to.be.false; // eslint-disable-line
//           expect(currentComponentState.messages).to.be.deep.equal(randomMessages);

//           const randomNewMessage = testUtilities.createOneRandomMessage();

//           actualStore.dispatch(createNewMessageAction(randomNewMessage));

//           currentComponentState = inboxWrapper.state();

//           expect(currentComponentState.messages).to.be.deep.equal([...randomMessages, randomNewMessage]);

//         });

//       });

//     });

//   });


//});


