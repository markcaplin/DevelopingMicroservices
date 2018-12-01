IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [MessageQueueLogging] (
    [MessageQueueLoggingId] int NOT NULL IDENTITY,
    [SenderTransactionQueueId] int NOT NULL,
    [TransactionCode] nvarchar(max) NULL,
    [ExchangeName] nvarchar(max) NULL,
    [Payload] nvarchar(max) NULL,
    [DateCreated] datetime2 NOT NULL,
    [DateUpdated] datetime2 NOT NULL,
    [AcknowledgementsRequired] int NOT NULL,
    [AcknowledgementsReceived] int NOT NULL,
    CONSTRAINT [PK_MessageQueueLogging] PRIMARY KEY ([MessageQueueLoggingId])
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180906004457_InitialDatabase', N'2.1.2-rtm-30932');

GO

DROP TABLE [MessageQueueLogging];

GO

CREATE TABLE [MessagesReceived] (
    [MessagesReceivedId] int NOT NULL IDENTITY,
    [SenderTransactionQueueId] int NOT NULL,
    [QueueName] nvarchar(max) NULL,
    [TransactionCode] nvarchar(max) NULL,
    [ExchangeName] nvarchar(max) NULL,
    [Payload] nvarchar(max) NULL,
    [DateCreated] datetime2 NOT NULL,
    CONSTRAINT [PK_MessagesReceived] PRIMARY KEY ([MessagesReceivedId])
);

GO

CREATE TABLE [MessagesSent] (
    [MessagesSentId] int NOT NULL IDENTITY,
    [SenderTransactionQueueId] int NOT NULL,
    [TransactionCode] nvarchar(max) NULL,
    [ExchangeName] nvarchar(max) NULL,
    [Payload] nvarchar(max) NULL,
    [DateCreated] datetime2 NOT NULL,
    [DateUpdated] datetime2 NOT NULL,
    [AcknowledgementsRequired] int NOT NULL,
    [AcknowledgementsReceived] int NOT NULL,
    CONSTRAINT [PK_MessagesSent] PRIMARY KEY ([MessagesSentId])
);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20180908001641_changes', N'2.1.2-rtm-30932');

GO

