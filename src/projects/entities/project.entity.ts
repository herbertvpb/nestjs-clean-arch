import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'canceled',
  Completed = 'completed',
}

@Entity() // Decorator para dizer que esta classe será uma entidade/tabela no banco
export class Project {
  @PrimaryColumn() // Chave primária da tabela
  id: string; // uuid

  @Column() // Coluna padrão
  name: string;

  @Column({ nullable: true }) // Coluna padrão
  description: string;

  @Column({ nullable: true, type: 'datetime' }) // Coluna padrão que pode ser null e seja datetime
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' }) // Coluna padrão que pode ser null e seja datetime
  cancelled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' }) // Coluna padrão que pode ser null e seja datetime
  forecasted_at: Date | null;

  @Column({ nullable: true, type: 'datetime' }) // Coluna padrão que pode ser null e seja datetime
  finished_at: Date | null;

  @Column({ type: 'simple-enum' }) // Coluna específica para trabalhar com enum no sqlite, pode variar em outros BD's
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecasted_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  // Regra de negócio fina
  start(started_at: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error('Cannot start active project');
    }

    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start completed project');
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }
}
