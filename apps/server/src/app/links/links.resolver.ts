import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GetLinksArgs } from './dto/args/get-links-args.dto';
import { Link } from './link.model';
import { LinksService } from './links.service';

@Resolver(() => Link)
export class LinksResolver {
    constructor(private readonly linkService: LinksService){}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Link], {name: 'links'})
    async getLinks(
        @Args() getLinksArgs: GetLinksArgs
    ){
        return this.linkService.getLinks(getLinksArgs);
    }
}
