import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding achievements...');

  const achievements = [
    {
      name: 'First Quest Completed',
      description: 'Complete your very first quest',
      icon: '🎯',
      questsRequired: 1,
      xpRequired: null,
      category: 'quests',
      rarity: 'common',
    },
    {
      name: 'Quest Apprentice',
      description: 'Complete 5 quests',
      icon: '⚔️',
      questsRequired: 5,
      xpRequired: null,
      category: 'quests',
      rarity: 'common',
    },
    {
      name: 'Quest Master',
      description: 'Complete 10 quests',
      icon: '🏆',
      questsRequired: 10,
      xpRequired: null,
      category: 'quests',
      rarity: 'rare',
    },
    {
      name: 'Quest Legend',
      description: 'Complete 25 quests',
      icon: '👑',
      questsRequired: 25,
      xpRequired: null,
      category: 'quests',
      rarity: 'epic',
    },
    {
      name: '100 XP Club',
      description: 'Earn 100 total XP',
      icon: '💯',
      xpRequired: 100,
      questsRequired: null,
      category: 'xp',
      rarity: 'common',
    },
    {
      name: 'XP Warrior',
      description: 'Earn 500 total XP',
      icon: '⚡',
      xpRequired: 500,
      questsRequired: null,
      category: 'xp',
      rarity: 'rare',
    },
    {
      name: 'XP Legend',
      description: 'Earn 1000 total XP',
      icon: '🌟',
      xpRequired: 1000,
      questsRequired: null,
      category: 'xp',
      rarity: 'epic',
    },
    {
      name: 'XP God',
      description: 'Earn 5000 total XP',
      icon: '🔥',
      xpRequired: 5000,
      questsRequired: null,
      category: 'xp',
      rarity: 'legendary',
    },
    {
      name: 'Learning Streak',
      description: 'Complete quests 5 days in a row',
      icon: '🔥',
      questsRequired: null,
      xpRequired: null,
      category: 'streak',
      rarity: 'rare',
    },
    {
      name: 'Dedication',
      description: 'Complete quests 10 days in a row',
      icon: '💪',
      questsRequired: null,
      xpRequired: null,
      category: 'streak',
      rarity: 'epic',
    },
  ];

  for (const achievement of achievements) {
    const existing = await prisma.achievement.findFirst({
      where: { name: achievement.name },
    });

    if (existing) {
      const updated = await prisma.achievement.update({
        where: { id: existing.id },
        data: achievement,
      });
      console.log(`${updated.name} - ${updated.rarity} (updated)`);
    } else {
      const created = await prisma.achievement.create({
        data: achievement,
      });
      console.log(` ${created.name} - ${created.rarity} (created)`);
    }
  }

  console.log('\n Achievements seeded successfully!');

  if (process.env.SEED_USER_ACHIEVEMENTS === 'true') {
    console.log('\n🔁 Seeding demo user achievements...');

    const demoUsername = 'seed_user';
    let user = await prisma.user.findFirst({ where: { username: demoUsername } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: demoUsername,
          password: 'password',
        },
      });
      console.log(`Demo user created: ${user.username} (id=${user.userId})`);
    } else {
      console.log(`Demo user exists: ${user.username} (id=${user.userId})`);
    }

    const achievementNamesToUnlock = [
      'First Quest Completed',
      '100 XP Club',
      'Quest Master',
    ];

    let userAchievementsCreated = 0;

    for (const name of achievementNamesToUnlock) {
      const ach = await prisma.achievement.findFirst({ where: { name } });
      if (!ach) {
        console.log(` Achievement not found by name: ${name}`);
        continue;
      }

      const existingUA = await prisma.userAchievement.findFirst({
        where: { userId: user.userId, achievementId: ach.id },
      });

      if (existingUA) {
        console.log(`UserAchievement already exists: user=${user.userId} achievement=${ach.id}`);
      } else {
        const created = await prisma.userAchievement.create({
          data: {
            userId: user.userId,
            achievementId: ach.id,
          },
        });
        userAchievementsCreated += 1;
        console.log(`UserAchievement created: id=${created.id} user=${created.userId} achievement=${created.achievementId}`);
      }
    }

    console.log(`\nDemo user achievements seeded: ${userAchievementsCreated} created`);
  }
}

main()
  .catch((e) => {
    console.error(' Error seeding achievements:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });