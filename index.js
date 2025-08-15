// === Подключаем dotenv ВСЕГДА в самом начале ===
require('dotenv').config();

// === Импортируем discord.js ===
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

// === Настройки ===
const BOT_TOKEN = process.env.BOT_TOKEN;
const GUILD_ID = '1405123287914119310';
const SELLER_ROLE_ID = '1405123287914119314';
const BUYER_ROLE_ID = '1405123287914119313';
const ANNOUNCE_CHANNEL_ID = '1405123288493068293';
const VERIFICATION_CHANNEL_NAME = '✅➣верификация';
const TICKETS_CHANNEL_ID = '1405123288757436462';
const AUTH_CHANNEL_ID = '1405523331632992306';
const ADMIN_ROLE_ID = '1405123287914119315';
const TICKET_CATEGORY_ID = '1405123288757436461';

// === Проверка токена ===
if (!BOT_TOKEN) {
  console.error('❌ Ошибка: BOT_TOKEN не найден. Установи переменную окружения.');
  process.exit(1);
}

// === Клиент бота ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// === Генерация кода ===
function generateCode() {
  return Math.random().toString(36).toUpperCase().substr(2, 6);
}

// === Подключение Firebase Admin ===
const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "necoshop-8a4c3",
  "private_key_id": "4c23ef376ab327a540f58d30a7f414ede4d71b38",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDNrqCUANtg5HmT\nHTp62I6GI5bv91Y8hqq8GaRdiKM9xD3/HtamHlp09TyVYnLQ/FVb5kR1KdXW+ixt\nSNjRRISGF9uUgRs2hN7OEXAbKTF+srQflqHZ0kKpSfcoKp5vUQ4iW9j7zVNA9lA1\nYR6tD6E1Yht2TLwgWIV8sLYURpQZl3MlhGPuGw7M3YUTLlIsQRG/oTelby+alejp\n5HrtyJWXdkdyzyT0SJAewyqsnXAh2ZIpmhpP6BhHNSXdPHewBuHQ8siNcTUvdni1\ntKcTqaCkogXYZDMTff7LjWfAdvGLu3tc+k+qanCyw91iIzONqnFLi2TPfw5UX5Qa\n2k6FwFuDAgMBAAECggEAIHPnsUKLWrfh+NTZR83IeyC9bYJskGM9KC2xkfJ/szy1\n/X17p71NT3vsQbPFYvUVcMkdzxC5RVC21s1yLF6vvEqiYkWWqhz/3KrCsf5naVK/\n+eX2BpzW2MgrX6KN2gmDfedZDq3gb3UNxcZbpTm8mWQv6hQEcOQWt8xYBk32iyzi\nTADO1h0CM6SBsPY1qECFdeqOSgIuyngAIgwyw7hxJpO80te88GsXuwhP06yv9nIP\nDiXgsb6/ynqojMeccMzDIwyfnF1sxp3zjBM5NgR4St1ke3eytDPyGPOsX0GwqlPx\n4/KhermD1V/0WAkUSLrb1lwxsEml5Z0N6aWmbbR7kQKBgQDvRdROFBT1Gyk1j90M\nAJ/tkf3lEUUrtioWh9kAKnZKNHtTvUQ+JSZr+mEPBlzZ7cknWH7NGzw3MLm9NUre\netFwZ+3qdBF67GqA1ZMMwam1CEF4JHAC21bDqPX9V9xI7o9+jlBSOSWkWOrCmGpN\nvq+cex3YTgztryx5CdZC2+lckQKBgQDcD6O8TrUf7d8CGTlE69BV16gLy/3ti5kf\n6I3OHzO5BcwwPPMY0H6EsQCIHDtF4Dx/QtE7g4lK9KDKi/00PRBodxlsoCZ5NjeM\nh0WH0iM3WL+vqSFtdVL7Sg9ReuK6cEWxOgwN6/1Ma/m3c18lQ/cwu0jev7nkwGin\njr4nlKAQ0wKBgQDQRNLwh3BajSLImYnJyb1rV9lNC0RPMQffhq2vBEbkflwe3q7I\n/SM9d7oGDv7BPsYJtnDg7WTzkTkLZZjeoL8u/XfMzOzuN1zY+Y4+209x4VbDUcwh\n4HPcaXR86X44CVbjzNJDT7ThIfhuG6bkNye6qDupLP754LFwRcy3c53j0QKBgQDE\nazE6YwZH+YmT1e/IFLNf652S6gE8hd2nHWt1D2SbQRF//Ob+vxouVc6jro85T2yw\nKnOXK1DgFnluUIUwm1CJ7cRDsK6mgj4SsKrfEDFetVhi8hNkH9Rxdyk1EPpObufF\nyIn54ymzjKzXkaLbIE8CsCfaqkbCZvsCk+YmbgJxAQKBgQDBK2uGqou/Pt8rFt1+\nbX00gK68AiPgexmB5uLM2n+htxym0Y9KkEwGsDg5vP82G+LDt+zDMwya10ofk8IV\nf7RN8gxiOelUa25VhQnR2GALPFYhAViFpUiUjUcsxuClM9L6QFgO3NrgeJWq3uyp\nnBugd8vmCAw+sBlqTTXBDFB3AQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@necoshop-8a4c3.iam.gserviceaccount.com",
  "client_id": "111125955451167214596",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40necoshop-8a4c3.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://necoshop-8a4c3-default-rtdb.firebaseio.com"
});

const db = admin.database();

// === Готовность бота — ОДИН раз ===
client.once('ready', async () => {
  console.log(`✅ Бот вошёл как ${client.user.tag}`);
  client.user.setActivity('на tostershop.netlify.app', { type: 'WATCHING' });

  // === Регистрация команд ===
  const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
  const commands = [{ name: 'roles', description: 'Получить роли' }];

  try {
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash-команды зарегистрированы');
  } catch (error) {
    console.error('❌ Ошибка регистрации команд:', error);
  }

  // === Кнопка верификации ===
  const verificationChannel = client.channels.cache.find(
    ch => ch.name === VERIFICATION_CHANNEL_NAME && ch.type === 0
  );
  if (verificationChannel) {
    const messages = await verificationChannel.messages.fetch({ limit: 10 });
    const existing = messages.find(m => m.author.id === client.user.id);
    if (!existing) {
      const embed = {
        title: '🔐 Добро пожаловать!',
        description: `
Привет! Чтобы получить доступ ко всем каналам, пройди верификацию.

1. Нажми кнопку ниже
2. Введи свой ник в Minecraft
3. Получи доступ ко всему серверу

❗ Ник должен быть реальным и соответствовать Minecraft.
        `,
        color: 0x00ff00,
        footer: { text: 'TosterShop' }
      };

      const row = {
        type: 1,
        components: [
          {
            type: 2,
            style: 1,
            label: 'Верифицироваться',
            custom_id: 'open_verification_modal'
          }
        ]
      };

      await verificationChannel.send({ embeds: [embed], components: [row] });
      console.log('✅ Сообщение с кнопкой отправлено в #✅➣верификация');
    }
  } else {
    console.error('❌ Канал #✅➣верификация не найден');
  }

  // === Кнопка тикетов ===
  const ticketsChannel = client.channels.cache.get(TICKETS_CHANNEL_ID);
  if (ticketsChannel) {
    const messages = await ticketsChannel.messages.fetch({ limit: 10 });
    const existing = messages.find(m => m.author.id === client.user.id);
    if (!existing) {
      const embed = {
        title: '📬 Связь с администрацией',
        description: 'Если у тебя есть вопрос по сайту, магазину или функционалу — создай тикет.\n\n💬 Нажми кнопку ниже, чтобы начать.',
        color: 0x0099ff,
        footer: { text: 'TosterShop — безопасная торговая площадка' }
      };

      const row = {
        type: 1,
        components: [
          {
            type: 2,
            style: 1,
            label: 'Создать тикет',
            custom_id: 'open_ticket_modal',
            emoji: '🎫'
          }
        ]
      };

      await ticketsChannel.send({ embeds: [embed], components: [row] });
      console.log('✅ Кнопка "Создать тикет" отправлена');
    }
  } else {
    console.error('❌ Канал для тикетов не найден');
  }
});

// === Кнопки-роли ===
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const roleMap = {
    'role_seller': SELLER_ROLE_ID,
    'role_buyer': BUYER_ROLE_ID
  };

  const roleId = roleMap[interaction.customId];
  if (roleId) {
    const role = interaction.guild.roles.cache.get(roleId);
    const member = interaction.member;

    if (member.roles.cache.has(roleId)) {
      await member.roles.remove(role);
      await interaction.reply({ content: 'Роль удалена.', ephemeral: true });
    } else {
      await member.roles.add(role);
      await interaction.reply({ content: 'Роль выдана!', ephemeral: true });
    }
  }
});

// === Команда /roles ===
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'roles') {
    const channel = client.channels.cache.get(ANNOUNCE_CHANNEL_ID);
    if (!channel) return interaction.reply({ content: 'Канал не найден.', ephemeral: true });

    const embed = {
      title: '🎮 Добро пожаловать в TosterShop!',
      description: 'Нажми на кнопку, чтобы получить роль:',
      color: 0xFFD700,
      fields: [
        { name: '🛒 Продавец', value: 'Выставляй товары в магазине.' },
        { name: '🛍️ Покупатель', value: 'Покупай товары и участвуй в аукционах.' }
      ]
    };

    const row = {
      type: 1,
      components: [
        { type: 2, style: 1, label: 'Я Продавец', custom_id: 'role_seller' },
        { type: 2, style: 2, label: 'Я Покупатель', custom_id: 'role_buyer' }
      ]
    };

    await channel.send({ embeds: [embed], components: [row] });
    await interaction.reply({ content: 'Сообщение с ролями отправлено!', ephemeral: true });
  }
});

// === Автоматическая выдача роли при входе ===
client.on('guildMemberAdd', async (member) => {
  if (member.guild.id !== GUILD_ID) return;

  const roleId = '1405123287914119311';
  const role = member.guild.roles.cache.get(roleId);

  if (!role) {
    console.error('❌ Роль "Верификация" не найдена');
    return;
  }

  try {
    await member.roles.add(role);
    console.log(`✅ Роль "${role.name}" выдана новому участнику: ${member.user.tag}`);
  } catch (error) {
    console.error('❌ Ошибка при выдаче роли:', error);
  }
});

// === Открытие модального окна верификации ===
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'open_verification_modal') return;

  const modal = {
    type: 9,
    custom_id: 'verification_modal',
    title: 'Верификация',
    components: [
      {
        type: 1,
        components: [
          {
            type: 4,
            custom_id: 'minecraft_nick',
            label: 'Твой ник в Minecraft',
            style: 1,
            placeholder: 'Например: korvy17',
            min_length: 2,
            max_length: 16,
            required: true
          }
        ]
      }
    ]
  };

  await interaction.showModal(modal);
});

// === Обработка модального окна верификации ===
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId !== 'verification_modal') return;

  const minecraftNick = interaction.fields.getTextInputValue('minecraft_nick');
  const guild = interaction.guild;
  const member = interaction.member;

  const verifiedRole = guild.roles.cache.get('1405174872987930644');
  if (!verifiedRole) {
    return interaction.reply({
      content: '❌ Ошибка: роль "Верифицирован" не найдена.',
      ephemeral: true
    });
  }

  if (member.roles.cache.has(verifiedRole.id)) {
    return interaction.reply({
      content: '✅ Ты уже верифицирован!',
      ephemeral: true
    });
  }

  try {
    const verificationRole = guild.roles.cache.get('1405123287914119311');
    if (member.roles.cache.has(verificationRole.id)) {
      await member.roles.remove(verificationRole);
    }

    await member.roles.add(verifiedRole);
    await member.setNickname(minecraftNick);

    await interaction.reply({
      content: `✅ Отлично, ${minecraftNick}! Ты успешно верифицирован. Добро пожаловать!`,
      ephemeral: true
    });

    console.log(`✅ ${interaction.user.tag} верифицирован как ${minecraftNick}`);
  } catch (error) {
    console.error('❌ Ошибка верификации:', error);
    await interaction.reply({
      content: '❌ Не удалось завершить верификацию. Обратись к модератору.',
      ephemeral: true
    });
  }
});

// === Обработка тикетов ===
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'open_ticket_modal') return;

  const modal = {
    type: 9,
    custom_id: 'ticket_modal',
    title: 'Создание тикета',
    components: [
      {
        type: 1,
        components: [
          {
            type: 4,
            custom_id: 'ticket_subject',
            label: 'Тема обращения',
            style: 1,
            placeholder: 'Например: Проблема с заказом',
            max_length: 50,
            required: true
          }
        ]
      },
      {
        type: 1,
        components: [
          {
            type: 4,
            custom_id: 'ticket_description',
            label: 'Опиши проблему',
            style: 2,
            placeholder: 'Что не работает? Как воспроизвести?',
            max_length: 1000,
            required: true
          }
        ]
      }
    ]
  };

  await interaction.showModal(modal);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId !== 'ticket_modal') return;

  const subject = interaction.fields.getTextInputValue('ticket_subject');
  const description = interaction.fields.getTextInputValue('ticket_description');
  const user = interaction.user;
  const guild = interaction.guild;

  try {
    const channel = await guild.channels.create({
      name: `тикет-${user.username}`,
      type: 0,
      parent: TICKET_CATEGORY_ID,
      topic: `Тикет от ${user.tag} | ${new Date().toLocaleString('ru-RU')}`,
      permissionOverwrites: [
        { id: guild.id, deny: ['ViewChannel'] },
        { id: user.id, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
        { id: ADMIN_ROLE_ID, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory', 'ManageMessages'] },
        { id: client.user.id, allow: ['ViewChannel', 'SendMessages', 'ManageMessages'] }
      ]
    });

    const closeRow = {
      type: 1,
      components: [
        {
          type: 2,
          style: 4,
          label: 'Закрыть тикет',
          custom_id: 'close_ticket',
          emoji: '🔒'
        }
      ]
    };

    const embed = {
      title: `🎫 Тикет: ${subject}`,
      description: description,
      color: 0x00ff9d,
      fields: [
        { name: '👤 Пользователь', value: `<@${user.id}>`, inline: true },
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '🕒 Создано', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
      ],
      thumbnail: { url: user.displayAvatarURL({ dynamic: true }) },
      footer: { text: 'TosterShop — поддержка' }
    };

    await channel.send({
      content: `<@${user.id}> и <@&${ADMIN_ROLE_ID}>`,
      embeds: [embed],
      components: [closeRow]
    });

    await interaction.reply({
      content: `✅ Тикет создан! Перейди в <#${channel.id}>`,
      ephemeral: true
    });

    console.log(`🎫 Тикет создан: ${user.tag} — ${subject}`);
  } catch (error) {
    console.error('❌ Ошибка создания тикета:', error);
    await interaction.reply({
      content: '❌ Не удалось создать тикет. Обратись к модератору.',
      ephemeral: true
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== 'close_ticket') return;

  const channel = interaction.channel;

  await interaction.reply({
    content: `🔒 Тикет закрыт пользователем <@${interaction.user.id}>`,
    ephemeral: false
  });

  setTimeout(() => {
    if (channel.deletable) {
      channel.delete().catch(console.error);
    }
  }, 5000);
});

// === Команда !auth ===
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== AUTH_CHANNEL_ID) return;
  if (!message.content.startsWith('!auth')) return;

  const code = generateCode();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  try {
    await db.ref(`auth_codes/${code}`).set({
      discordId: message.author.id,
      username: message.author.username,
      expiresAt
    });

    await message.author.send(`🔑 Ваш код авторизации: \`${code}\`\nВведите его на: https://tostershop.netlify.app/auth.html`);
    await message.reply('Код отправлен в ЛС! ✅');
  } catch (error) {
    console.error('❌ Ошибка при сохранении кода:', error);
    await message.reply('Произошла ошибка. Попробуй позже.');
  }
});

// === Запуск бота ===
client.login(BOT_TOKEN);
