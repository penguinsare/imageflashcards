//using ImageFlashCards.Models;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.Extensions.Options;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace ImageFlashCards.Services
//{
//    public class CustomUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<ApplicationUser>
//    {
//        public CustomUserClaimsPrincipalFactory(
//                UserManager<ApplicationUser> userManager,
//                IOptions<IdentityOptions> optionsAccessor)
//                    : base(userManager, optionsAccessor)
//        {
//        }

//        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser user)
//        {
//            var identity = await base.GenerateClaimsAsync(user);
//            identity.AddClaim(new Claim(DefinedUserClaimTypes.Role, DefinedRoles.BasicUser));
//            return identity;
//        }
//    }
//}
