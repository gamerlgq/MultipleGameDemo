import { sp, Vec3 } from "cc";
import { SpineNodeBase } from "../../spine/SpineNodeBase";

export namespace FightConstant {
    export namespace macro {
        export enum Camp {
            Attacker,
            Defender
        }

        export enum HeroAnimate {
            back_attack = "back_atk",
            back_die = "back_die",
            back_hit = "back_hit",
            back_idle = "back_idle",
            back_move = "back_move",
            back_skill = "back_skill",
            front_attack = "front_atk",
            front_die = "front_die",
            front_hit = "front_hit",
            front_idle = "front_idle",
            front_move = "front_move",
            front_skill = "front_skill",
        }

        export enum FightEvent{
            Game_Star,
            Game_End,
            Game_Pause,
            Game_Resume,
            Game_Replay,
            Game_Broadcast
        }

        export enum FightLayer{
            BOTTM_EFFECT,
            ROLE,
            TOP_EFFECT,
            DIALOG
        }

        export enum FightConmand{
            Create,
            Attack,
            Die,
            Hit,
            Idle,
            Move,
            Skill
        }

        export enum FightEffect{
            FireBall
        }
    }
    
    export namespace interfaces {
        /**
         * @description: 骨骼动画回调函数
         * @param {type} trackEntry:sp.spine.TrackEntr
         * @return {type} void
         */        
        export interface SpineTrackEntryCallFunc {
            (trackEntry:sp.spine.TrackEntry):void
        }


        /**
         * @description: 用来设置动画播放过程中帧事件的监听
         * @param {type} trackEntry:sp.spine.TrackEntr
         * @param {type} event:sp.spine.Event
         * @return {type} void
         */        
        export interface SpineFrameEventCallFunc {
            (trackEntry:sp.spine.TrackEntry, event: sp.spine.Event):void
        }


        export interface FightCmdData {
            Command:number,
            data:any
        }

        export interface ActionCreate {
            Id:number;
            Posititon:Vec3;
        }

        export interface ActionSpineAnimation {
            Id:number;
            Animation:string;
            Mode:number;
            IsLoop:boolean;
        }

        export interface ActionSkill<T extends SpineNodeBase> {
            Id:number;
            Duration:number;
            Animation:string;
            Own:T;
            Tar:T;
        }
    }
}