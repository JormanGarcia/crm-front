import Layout from "@/components/ui/layout";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { ReactElement } from "react";

export default function Appareance() {
  const { t } = useTranslation("common");

  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, optio
        veniam in repellendus eum, atque aperiam vel temporibus, fugit maxime
        illum dicta a fugiat non. Quaerat voluptatem, quod saepe, illum
        voluptatibus officia laborum animi ipsa, sit temporibus eaque possimus!
        Eveniet, eos odio, repellat sapiente facere quidem doloribus porro in
        corporis praesentium numquam! Architecto beatae, molestiae suscipit
        consectetur ab inventore ratione laudantium labore nihil repellendus,
        accusantium consequuntur, voluptates aspernatur consequatur sit
        reprehenderit harum autem quod possimus saepe aliquid sint earum? Neque
        earum maiores placeat inventore autem pariatur ut officiis blanditiis
        deleniti consequuntur, tenetur perferendis dignissimos eum molestiae id
        sapiente similique voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, optio
        veniam in repellendus eum, atque aperiam vel temporibus, fugit maxime
        illum dicta a fugiat non. Quaerat voluptatem, quod saepe, illum
        voluptatibus officia laborum animi ipsa, sit temporibus eaque possimus!
        Eveniet, eos odio, repellat sapiente facere quidem doloribus porro in
        corporis praesentium numquam! Architecto beatae, molestiae suscipit
        consectetur ab inventore ratione laudantium labore nihil repellendus,
        accusantium consequuntur, voluptates aspernatur consequatur sit
        reprehenderit harum autem quod possimus saepe aliquid sint earum? Neque
        earum maiores placeat inventore autem pariatur ut officiis blanditiis
        deleniti consequuntur, tenetur perferendis dignissimos eum molestiae id
        sapiente similique voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, optio
        veniam in repellendus eum, atque aperiam vel temporibus, fugit maxime
        illum dicta a fugiat non. Quaerat voluptatem, quod saepe, illum
        voluptatibus officia laborum animi ipsa, sit temporibus eaque possimus!
        Eveniet, eos odio, repellat sapiente facere quidem doloribus porro in
        corporis praesentium numquam! Architecto beatae, molestiae suscipit
        consectetur ab inventore ratione laudantium labore nihil repellendus,
        accusantium consequuntur, voluptates aspernatur consequatur sit
        reprehenderit harum autem quod possimus saepe aliquid sint earum? Neque
        earum maiores placeat inventore autem pariatur ut officiis blanditiis
        deleniti consequuntur, tenetur perferendis dignissimos eum molestiae id
        sapiente similique voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, optio
        veniam in repellendus eum, atque aperiam vel temporibus, fugit maxime
        illum dicta a fugiat non. Quaerat voluptatem, quod saepe, illum
        voluptatibus officia laborum animi ipsa, sit temporibus eaque possimus!
        Eveniet, eos odio, repellat sapiente facere quidem doloribus porro in
        corporis praesentium numquam! Architecto beatae, molestiae suscipit
        consectetur ab inventore ratione laudantium labore nihil repellendus,
        accusantium consequuntur, voluptates aspernatur consequatur sit
        reprehenderit harum autem quod possimus saepe aliquid sint earum? Neque
        earum maiores placeat inventore autem pariatur ut officiis blanditiis
        deleniti consequuntur, tenetur perferendis dignissimos eum molestiae id
        sapiente similique voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, optio
        veniam in repellendus eum, atque aperiam vel temporibus, fugit maxime
        illum dicta a fugiat non. Quaerat voluptatem, quod saepe, illum
        voluptatibus officia laborum animi ipsa, sit temporibus eaque possimus!
        Eveniet, eos odio, repellat sapiente facere quidem doloribus porro in
        corporis praesentium numquam! Architecto beatae, molestiae suscipit
        consectetur ab inventore ratione laudantium labore nihil repellendus,
        accusantium consequuntur, voluptates aspernatur consequatur sit
        reprehenderit harum autem quod possimus saepe aliquid sint earum? Neque
        earum maiores placeat inventore autem pariatur ut officiis blanditiis
        deleniti consequuntur, tenetur perferendis dignissimos eum molestiae id
        sapiente similique voluptatum.
      </p>
    </div>
  );
}

Appareance.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
