discord.Structures.extend('Message', Message => {
    class ExtendedMessage extends Message {
        reply(...args) {
            const apiMessage = discord.APIMessage.create(this.channel, ...args).resolveData();
            apiMessage.data.message_reference = {
                message_id: this.id,
                guild_id: this.guild.id
            };
            apiMessage.data.allowed_mentions = {
                ...(apiMessage.data.allowed_mentions || {}),
                replied_user: apiMessage.options.ping || false
            };
            return this.channel.send(apiMessage);
        }
    }
    return ExtendedMessage;
});
