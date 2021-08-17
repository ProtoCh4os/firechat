<template>
  <div class="chat position-absolute absolute-center">
    <q-card bordered class="contacts">
      <div v-if="!contacts.length">
        <contact
          v-for="i in [0, 1, 2]"
          :key="i"
          :skeleton="true"
          :dividerBelow="i < 2"
        />
      </div>
      <contact
        v-else
        v-for="(contact, id) in contacts"
        :key="contact.id"
        :title="contact.title"
        :chatId="contact.id"
        :dividerBelow="id < contacts.length - 1"
        clickable
        @click="openConversation"
      />
    </q-card>
    <q-card bordered class="convo flex">
      <div class="currentContact" v-if="!loading">
        <contact
          :title="convo ? convo.title : ''"
          :skeleton="!convo"
          :dividerBelow="true"
          :chatId="convo ? convo.id : ''"
        />
      </div>
      <div class="messages position-relative">
        <div
          v-if="loading"
          class="absolute-center flex justify-center align-center text-center"
        >
          <q-icon name="far fa-comments" size="10em" color="accent" />
          <span>Pick a conversation and keep on chatting</span>
        </div>
        <div v-else>
          <chat-message
            v-for="(message, id) in messages"
            :key="id"
            :isAuthor="message.sender === curUser.uid"
            :authorName="message.sender"
            :text="message.message"
            :stamp="message.created"
          />
        </div>
      </div>
      <div class="textField flex q-px-md q-py-sm" v-if="convo">
        <q-form @submit.prevent="sendMessage">
          <q-input
            autofocus
            outlined
            filled
            label="Type in your message..."
            v-model="messageField"
            :loading="loading"
            :disable="loading"
          >
            <div slot="after">
              <q-icon name="fas fa-paperclip" style="margin-right: 10px" />
              <q-icon name="fas fa-play" @click="sendMessage" />
            </div>
          </q-input>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Contact from 'src/components/Contact.vue';
import { firestore } from 'src/boot/vuefire';
import { sessionStore } from 'src/store/session';
import {
  ConversationInterface,
  MessageInterface,
} from 'src/interfaces/conversation';
import ChatMessage from 'src/components/ChatMessage.vue';

@Component({
  components: { Contact, ChatMessage },
})
export default class extends Vue {
  contacts: ConversationInterface[] = [];

  convo: ConversationInterface | false = false;

  messageField = '';

  messages: MessageInterface[] = [];

  contactsUnsub: () => void = () => undefined;

  convoUnsub: () => void = () => undefined;

  mounted() {
    this.start();
  }

  destroy() {
    this.contactsUnsub();
    this.convoUnsub();
  }

  get loading() {
    return !this.convo;
  }

  get curUser() {
    const { user } = sessionStore(this.$store);
    if (!user) throw new Error('Not logged');
    return user;
  }

  openConversation(convo: string) {
    this.convoUnsub();
    this.convo = this.contacts.find((c) => c.id === convo) || false;
    this.messages = [];

    if (!this.convo) return;

    const col = firestore.collection(`conversations/${convo}/messages`);
    this.convoUnsub = col.orderBy('created').onSnapshot(({ size, docs }) => {
      if (size) {
        this.messages = [...docs].map((d) => ({
          id: d.id,
          ...d.data(),
          created: d.data().created.toDate(),
        })) as MessageInterface[];
      }
    });
  }

  sendMessage() {
    if (!this.convo) return;

    const col = firestore.collection(`conversations/${this.convo.id}/messages`);
    col
      .doc()
      .set({
        sender: this.curUser.uid,
        message: this.messageField,
        created: new Date(),
      } as Partial<MessageInterface>)
      .catch()
      .finally(() => {
        this.messageField = '';
      });
  }

  start() {
    const col = firestore.collection('conversations');
    this.contactsUnsub = col
      .where('members', 'array-contains', this.curUser.uid)
      .orderBy('created')
      .onSnapshot(({ size, docs }) => {
        if (size) {
          this.contacts = [...docs].map((d) => ({
            id: d.id,
            ...d.data(),
            created: d.data().created.toDate(),
          })) as ConversationInterface[];
        }
      });
  }
}
</script>

<style lang="scss" scoped>
.chat {
  height: 88vh;
  display: flex;
  gap: 2px;
  top: 55vh;
  width: clamp(200px, 70%, 900px);

  ::-webkit-scrollbar {
    width: 0.75rem;
    height: 0.75rem;
  }
  ::-webkit-scrollbar-track {
    background: $primary;
  }

  ::-webkit-scrollbar-thumb {
    background: $accent;
  }

  > * {
    width: 100%;
  }

  .contacts {
    flex: 3;
    overflow-y: scroll;
  }

  .convo {
    flex: 7;
    flex-direction: column;

    .messages {
      overflow-y: scroll;
      flex: 1;
      padding: 15px;
    }

    .textField {
      > * {
        width: 100%;
      }
      margin-top: auto;
      border-top: 1px $primary solid;
      width: 100%;
    }
  }
}
</style>
