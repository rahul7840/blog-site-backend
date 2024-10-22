import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Delete all existing data
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    console.log('::::::::Deleted all existing data::::::::');

    // Create users
    const user1 = await prisma.user.create({
        data: {
            id: '00000000-0000-0000-0000-000000000001',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'rahul@123',
            access_token: 'john-access-token',
            refresh_token: 'john-refresh-token',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            id: '00000000-0000-0000-0000-000000000002',
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'rahul@123',
            access_token: 'jane-access-token',
            refresh_token: 'jane-refresh-token',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            id: '00000000-0000-0000-0000-000000000003',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            password: 'rahul@123',
            access_token: 'bob-access-token',
            refresh_token: 'bob-refresh-token',
        },
    });

    console.log('Users created.');

    // Create posts
    const post1 = await prisma.post.create({
        data: {
            id: '00000000-0000-0000-0000-000000000004',
            title: 'Introduction to Prisma',
            content:
                'Prisma makes database access easy with an auto-generated query builder.',
            user_id: user1.id,
        },
    });

    const post2 = await prisma.post.create({
        data: {
            id: '00000000-0000-0000-0000-000000000005',
            title: 'Exploring NestJS',
            content:
                'NestJS is a progressive Node.js framework for building efficient and scalable server-side applications.',
            user_id: user2.id,
        },
    });

    const post3 = await prisma.post.create({
        data: {
            id: '00000000-0000-0000-0000-000000000006',
            title: 'Understanding TypeScript',
            content:
                'TypeScript is a strongly typed programming language that builds on JavaScript.',
            user_id: user3.id,
        },
    });

    console.log('Posts created.');

    // Create comments for the first post
    await prisma.comment.create({
        data: {
            id: '00000000-0000-0000-0000-000000000007',
            content: 'Great introduction, very helpful!',
            post_id: post1.id,
            user_id: user2.id,
        },
    });

    await prisma.comment.create({
        data: {
            id: '00000000-0000-0000-0000-000000000008',
            content: 'Thanks for sharing!',
            post_id: post1.id,
            user_id: user3.id,
        },
    });

    await prisma.comment.create({
        data: {
            id: '00000000-0000-0000-0000-000000000009',
            content: 'Looking forward to more content like this.',
            post_id: post1.id,
            user_id: user1.id,
        },
    });

    console.log('Comments created.');
    console.log(':::::: SEEDING COMPLETED SUCCESSFULLY ::::::');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
